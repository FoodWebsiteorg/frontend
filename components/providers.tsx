"use client"

export function Providers({ children }: { children: React.ReactNode }) {
  // No longer using NextAuth - using JWT with Zustand instead
  return <>{children}</>
}

