import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/', '/trip(.*)'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api)(.*)'],
}
