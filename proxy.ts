import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  console.log("🔥 PROXY HIT:", req.nextUrl.pathname);

  const token = req.cookies.get("token")?.value;

  // Protect Dashboard
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};