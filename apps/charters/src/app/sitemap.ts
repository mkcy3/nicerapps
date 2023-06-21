import { MetadataRoute } from 'next'

import { publicRoutes } from '@/lib/cms'

const baseUrl = process.env.NEXT_PUBLIC_URL

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = publicRoutes

  const routesMap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routesMap]
}
