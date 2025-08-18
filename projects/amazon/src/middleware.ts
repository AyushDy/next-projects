import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

const protectedRoutes = ["/admin", ];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const decoded = await verifyJWT(token);
  
  if (protectedRoutes.some((path) => pathname.startsWith(path))) {
    if (!token) return NextResponse.redirect(new URL("/", req.url));
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (decoded) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  

    return NextResponse.next();
  }
  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*", "/auth/:path*","/admin","/auth"],
};
