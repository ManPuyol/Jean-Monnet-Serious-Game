import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { getUser } from "./lib/utils";

export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/teach')) {
    const user = await getUser();
    if (user?.user_metadata.role == 'student') {
      return NextResponse.redirect(new URL('/study', request.url))
    }
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
