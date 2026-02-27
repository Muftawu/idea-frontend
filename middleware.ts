import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl

    const public_paths = ["/signin", "/signup"]

    if (request.url.includes("logout")) {
        console.log("logout included")
        if (request.cookies.has("access_token") || request.cookies.has("refresh_token") || request.cookies.has("user_id")) {
            console.log("has accesss, refresh and user_id")
            request.cookies.delete("access_token")
            request.cookies.delete("refresh_token")
            request.cookies.delete("user_id")
        }
    }

    if (!request.cookies.has("access_token") || !request.cookies.has("refresh_token")) {

        if (public_paths.some((item) => pathname.startsWith(item))) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL("signin", request.nextUrl.origin))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
}
