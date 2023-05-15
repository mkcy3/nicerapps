import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/', '/login*', '/sign-up*', '/trip'],
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }
    // rededirect them to organization selection page
    if (!auth.orgId) {
      const orgSelection = new URL('/org-selection', req.url)
      return NextResponse.redirect(orgSelection)
    }
  },
})
// Stop Middleware running on static files and public folder
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
