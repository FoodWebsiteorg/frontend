import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public routes - no auth required
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/services",
    "/provider",
  ]

  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Protected routes - client-side will check auth
  // Backend API handles actual authentication
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/provider/dashboard/:path*",
    "/admin/:path*",
  ],
}
