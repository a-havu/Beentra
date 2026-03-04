import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./lib/auth";

export async function handleDashboardRoutes(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  if (session.role !== "admin")
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export async function handleApiRoutes(request: NextRequest) {
  const session = await getSession();
  if (session) return NextResponse.next();

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/user")) {
    const apiKey = await request.headers.get("x-api-key");
    if (!apiKey)
      return NextResponse.json(
        {
          error:
            "not authorized x-api-key is needed, you can have it from /apikey",
        },
        { status: 401 },
      );
  }

  return NextResponse.next();
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    return handleApiRoutes(request);
  }

  if (pathname.startsWith("/dashboard")) {
    return handleDashboardRoutes(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
