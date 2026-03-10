import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./lib/auth";
import { prisma } from "@/lib/prisma";


/*
PublicApi:
the user will call the public apis. if the user has the key then he can go the needed work.
the publicapiuser can access only events, he can:
1. get all events.
2. get one event.
3. add his events.
4. edit his events
5. delete his events

rate limitation:
the user has 100 requests per hour, after the hour it will be rested to 0 again.
so the user cannot send huge number of requests.

*/


const PUBLIC_PATHS = ["/login", "/registration", "/apikey", "/privacy", "/terms"];

//this for handling calls to dashboard, only the admin can access it.
export async function handleProtectedRoutes(request: NextRequest, pathname:string) {
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await getSession();

  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  if(pathname.startsWith("/dashboard")){
    if (session.role !== "admin")
        return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}


// this function will check if the api key is correct and already registerd.
//then will check if it is allowed by the rate limit.
async function checkPublicUser(apiKey: string | null) {
  const publicUser = await prisma.publicApiUser.findUnique({
    where: { key: apiKey ?? undefined }
  })

  if (!publicUser) {
    return NextResponse.json({
      error: "Not authorized, cannot find a publicUser with this apiKey"
    }, { status: 401 })
  }

  //initialize the restAttime
  const now = new Date();
  
  // check if the time is not setted yet or is more than 1 hour then rest  
  if (!publicUser.resetAt || new Date() >= publicUser.resetAt){
    await prisma.publicApiUser.update({
      where: { id: publicUser.id },
      data: {
        requestCount: 0,
        resetAt: new Date(now.getTime() + 60 * 60 * 1000) // 1 hour from now
      }
    })
    publicUser.requestCount = 0
  }


  if(publicUser.requestCount >=100){
    return NextResponse.json({
      error: "Rate limit exceeded (100 requests per hour)"
    }, { status: 429 })
  }

  await prisma.publicApiUser.update({
      where: { id: publicUser.id },
      data: {
        requestCount: { increment: 1 }
      }
    })
}

//to hanlde api calls.
export async function handleApiRoutes(request: NextRequest) {
  //if you loged in then you can access all apis
  const session = await getSession();
  if (session)
    return NextResponse.next();


  //if not logedin then only the public apis and methods are allowed
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  //states and protected apis can be accessed by logedin users only
  if (pathname.startsWith("/api/projects") || pathname.startsWith("/api/stats")) {
    return NextResponse.json(
      {
        error: "not authorized, you have to log in",
      },
      { status: 401 },
    );
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
  try{
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api")) {
    return handleApiRoutes(request);
  }

  
  return handleProtectedRoutes(request, pathname);
}catch(error){
  return NextResponse.json({
      error: error instanceof Error ? error.message : "Internal server error"
    }, { status: 500 })
}
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

