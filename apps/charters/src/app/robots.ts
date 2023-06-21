import { MetadataRoute } from 'next'

import { publicRoutes } from '@/lib/cms'

const baseUrl = process.env.NEXT_PUBLIC_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: publicRoutes,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
