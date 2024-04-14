import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isNewUser = request.cookies.get("newUser")?.value;

  // if (
  //   isNewUser &&
  //   request.nextUrl.pathname.startsWith("/") &&
  //   !request.nextUrl.pathname.endsWith("onboarding") &&
  //   !request.nextUrl.pathname.endsWith("signup")
  // ) {
  //   return Response.redirect(new URL("/onboarding", request.url));
  // }
  // console.log(isNewUser);
  // if (
  //   !isNewUser &&
  //   request.nextUrl.pathname.startsWith("/") &&
  //   (request.nextUrl.pathname.endsWith("onboarding") ||
  //     request.nextUrl.pathname.endsWith("signup"))
  // ) {
  //   return Response.redirect(new URL("/", request.url));
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
