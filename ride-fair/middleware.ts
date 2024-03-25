import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;

  // console.log(isLoggedIn);

  // if (!isLoggedIn && request.nextUrl.pathname.startsWith("/")) {
  //   return Response.redirect(new URL("/settings", request.url));
  // }

  // if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
  //   return Response.redirect(new URL("/dashboard", request.url));
  // }

  // if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
  //   return Response.redirect(new URL("/login", request.url));
  // }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|settings).*)"],
};
