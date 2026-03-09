import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./lib/auth";
import { prisma } from "@/lib/prisma";
import { publicApiUser } from '@prisma/client'


export async function handleDashboardRoutes(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  if (session.role !== "admin")
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

async function checkPublicUser(apiKey: string | null) {
  const publicUser = await prisma.publicApiUser.findUnique({
    where: { key: apiKey ?? undefined }
  })
  if (!publicUser) {
    return NextResponse.json({
      error: "Not authorized, cannot find a publicUser with this apiKey"
    }, { status: 401 })
  }
}


export async function handleApiRoutes(request: NextRequest) {
  //if you loged in then you can access all apis
  const session = await getSession();
  if (session)
    return NextResponse.next();


  //if not logedin then only the public apis and methods are allowed
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  //states and prohects apis can be accessed by logedin users only
  if (pathname.startsWith("/api/projects") || pathname.startsWith("/api/stats")) {
    // return NextResponse.json(
    //   {
    //     error: "not authorized, you have to log in",
    //   },
    //   { status: 401 },
    //); HOX HOX i commented this out to test the project creation without log in - Aino
  }
  if (pathname.startsWith("/api/user")) {
    if (method === "POST") return NextResponse.next(); // only for register new user
    return NextResponse.json(
      { error: "Not authorized, you have to log in" },
      { status: 401 },
    );
  }

  if (pathname.startsWith("/api/events")) {
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Not authorized, x-api-key is required. Get yours at /apikey",
        },
        { status: 401 },
      );
    }
    const authError = await checkPublicUser(apiKey)
    if (authError) return authError

    return NextResponse.next();
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
