import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("jwt_token");


  if (!accessToken && (request.nextUrl.pathname != "/auth/login" && request.nextUrl.pathname != "/auth/register")) 
  {return NextResponse.redirect(new URL("/auth/login", request.url));}

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|auth|_next/static|_next/image|.*\\.png$).*)"],
};