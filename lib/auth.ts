import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        loginType: { label: "Login Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null

        if (credentials.loginType === "otp") {
          // OTP login
          const otpRecord = await prisma.oTP.findFirst({
            where: {
              email: credentials.email,
              code: credentials.otp,
              type: "LOGIN",
              used: false,
              expiresAt: { gt: new Date() },
            },
          })

          if (!otpRecord) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) return null

          // Mark OTP as used
          await prisma.oTP.update({
            where: { id: otpRecord.id },
            data: { used: true },
          })

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } else {
          // Password login
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) return null

          const isValid = await bcrypt.compare(
            credentials.password || "",
            user.password
          )

          if (!isValid) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

