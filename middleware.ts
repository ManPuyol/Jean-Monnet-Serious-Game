import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getUser } from "./lib/getUser";

export async function middleware(request: NextRequest) {
  const user = await getUser();

  if (!user) {
    void updateSession(request)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if ((request.nextUrl.pathname.startsWith('/teach') || request.nextUrl.pathname.startsWith('/build')) && user.user_metadata.role == 'student') {
    void updateSession(request)
    return NextResponse.redirect(new URL('/study', request.url))
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
