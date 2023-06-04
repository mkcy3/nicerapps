export const publicRoutes = [
  '/',
  '/trip(.*)',
  '/rates',
  '/privacy',
  '/terms-of-use',
  '/faq',
]

export const navbarNavigation = [
  { name: 'Check Dates', href: '/trip' },
  { name: 'Rates', href: '/rates' },
  { name: 'FAQ', href: '/faq' },
]

export const userNavigation = [
  { name: 'Manage Bookings', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export const footerNavigation = {
  adventures: [
    { name: 'Destinations', href: '/#destinations' },
    { name: 'Skipper', href: '/#skipper' },
    { name: 'Make a booking', href: '/trip' },
  ],

  resources: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Rates', href: '/rates' },
    { name: 'Charter Terms', href: '#' },
    { name: 'Sitemap', href: '/site' },
  ],
}
