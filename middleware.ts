import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = [
  "/feed",
  "/profile",
  "/settings",
  "/notifications",
  "/connect",
  "/business",
  "/subscription",
];

// Routes that are public (no auth required)
const publicRoutes = [
  "/",
  "/login",
  "/about",
  "/card", // Public e-card page
  "/news",
];

// Routes that should redirect to feed if already authenticated
const authRoutes = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the access token from cookies or check authorization header
  const accessToken =
    request.cookies.get("accessToken")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // Check if we have a token in localStorage via a custom header (set by client)
  // Note: localStorage is not accessible in middleware, so we rely on cookies
  // The client should sync localStorage token to cookies

  const isAuthenticated = !!accessToken;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname.startsWith(route) && pathname !== "/profile" // /profile without ID is edit profile
  );

  // Check if the current route is an auth route (login/register)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Special handling for /card routes - always public
  if (pathname.startsWith("/card")) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access auth routes (login)
  // Redirect them to feed
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - public files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
