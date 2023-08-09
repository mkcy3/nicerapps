import { authMiddleware } from '@clerk/nextjs'

import { publicRoutes } from './lib/cms'

export default authMiddleware({
  publicRoutes: publicRoutes,
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
