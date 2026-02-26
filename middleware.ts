import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { removeAuthTokens } from './lib/actions'

export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl


    console.log("pathname", pathname)

    const public_paths = ["/signin", "/signup"]

    if (pathname.includes("logout")) {
        console.log("logout included")
        removeAuthTokens()
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
