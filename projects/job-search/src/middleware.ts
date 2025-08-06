import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./lib/jwt";

const adminRoutes = ["/admin","/upload"];

export default async function Middleware(req: NextRequest) {

  try {
    const user = await getCurrentUser();
    const pathname = req.nextUrl.pathname;

    const isProtectedRoute = adminRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtectedRoute && (!user || user.role !== "admin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);
  }
  return NextResponse.next();
}


const config = {
  matcher : ["/admin/:path*","/admin"]
}
