import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken");
  if (token) {
    return NextResponse.next();
  }
  const url = req.nextUrl.clone();
  url.pathname = "/auth/login";
  url.search = `redirect=${req.nextUrl.pathname}${req.nextUrl.search}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
