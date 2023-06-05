import Link from 'next/link'

import { publicRoutes } from '@/lib/cms'

export default function SitePage() {
  function formatRoute(route: string): string {
    const lettersOnlyRoute = route.slice(1)
    return lettersOnlyRoute === '' ? 'Home' : lettersOnlyRoute
  }
  return (
    <div className="prose mt-16">
      <h1> Sitemap</h1>
      <ul>
        {publicRoutes.map((route) => (
          <li key={route} className="capitalize">
            <Link className="no-underline" href={route}>
              {formatRoute(route)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
