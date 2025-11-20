import { prisma } from "@/lib/prisma"
import { generateOTP } from "@/lib/utils"

export async function createOTP(
  email?: string,
  mobile?: string,
  type: string = "LOGIN"
) {
  const code = generateOTP(6)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  const otp = await prisma.oTP.create({
    data: {
      email,
      mobile,
      code,
      type,
      expiresAt,
    },
  })

  // TODO: Send OTP via email/SMS
  // For now, we'll just return it (in production, send via email/SMS service)
  console.log(`OTP for ${email || mobile}: ${code}`)

  return { code, expiresAt }
}

export async function verifyOTP(
  email?: string,
  mobile?: string,
  code: string,
  type: string = "LOGIN"
) {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      email: email || undefined,
      mobile: mobile || undefined,
      code,
      type,
      used: false,
      expiresAt: { gt: new Date() },
    },
  })

  if (!otpRecord) {
    return { valid: false, message: "Invalid or expired OTP" }
  }

  await prisma.oTP.update({
    where: { id: otpRecord.id },
    data: { used: true },
  })

  return { valid: true }
}

