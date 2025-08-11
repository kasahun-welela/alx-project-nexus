import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Protected routes
  const protectedPaths = [
    /^\/jobs\/[^/]+\/apply$/, // jobs/[id]/apply
    /^\/saved-jobs$/,         // saved-jobs
    /^\/my-application$/,     // my-application
  ];

  const isProtected = protectedPaths.some((pattern) =>
    pattern.test(request.nextUrl.pathname)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname); // optional: store original URL
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/jobs/:id/apply",  // dynamic job apply route
    "/saved-jobs",
    "/my-application",
  ],
};
