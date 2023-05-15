import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Set the paths that don't require the user to be signed in
const publicPaths = ['/', '/login*', '/sign-up*', '/trip']

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
  )
}

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next()
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request)

  if (!userId) {
    // redirect the users to /pages/login/[[...index]].ts

    const signInUrl = new URL('/login', request.url)
    signInUrl.searchParams.set('redirect_url', request.url)
    return NextResponse.redirect(signInUrl)
  }
  return NextResponse.next()
})

// Stop Middleware running on static files and public folder
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
