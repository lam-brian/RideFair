import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;

  if (
    !isLoggedIn &&
    request.nextUrl.pathname.startsWith("/") &&
    !request.nextUrl.pathname.endsWith("/onboarding") &&
    !request.nextUrl.pathname.endsWith("/signup")
  ) {
    return Response.redirect(new URL("/", request.url));
  }

  if (
    isLoggedIn &&
    (request.nextUrl.pathname.endsWith("/onboarding") ||
      request.nextUrl.pathname.endsWith("/signup"))
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|settings|$).*)"],
};
