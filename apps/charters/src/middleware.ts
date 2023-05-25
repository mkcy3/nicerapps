import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/trip(.*)',
    '/rates',
    '/itinerary',
    '/privacy',
    '/terms-of-use',
  ],
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
