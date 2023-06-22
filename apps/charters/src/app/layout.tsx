import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: {
    template: '%s | Nicer Charters',
    default: 'Nicer Charters',
  },
  description:
    'Skippered Georigan Bay sailing charters for events, parties and week long cruises.',
  keywords: [
    'Yacht charters Georgian Bay',
    'Day sails Georgian Bay',
    'Week-long yacht adventures Georgian Bay',
    'Corporate yacht parties Georgian Bay',
    'Corporate event Georgian Bay',
    'Bachelorette party yacht charters Georgian Bay',
    'Yacht cruises Georgian Bay',
    'Learn to sail in Georgian Bay',
    'Private yacht rentals Georgian Bay',
    'Luxury yacht experiences Georgian Bay',
    'Sailboat charters Georgian Bay',
    'Sailboat rentals Georgian Bay',
    'Yachting vacations Georgian Bay',
    'Yacht excursions Georgian Bay',
    'Yacht tourism Georgian Bay',
    'Boat tours Georgian Bay',
    'Yacht rental company Georgian Bay',
    'Exclusive yacht events Georgian Bay',
    'Yacht charter packages Georgian Bay',
    'Sailing lessons Georgian Bay',
    'Yacht fleet Georgian Bay',
    'Bachelorette parties',
    'Cruise Georgian Bay',
    'Mileage building Toronto',
    'Mileage builder Ontario',
    'Mileage builder',
    'Mileage building',
  ],
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'en-CA': '/en-CA',
    },
  },
  openGraph: {
    title: 'Nicer Charters',
    description:
      'Skippered Georigan Bay sailing charters for events, parties and week long cruises.',
    url: 'https://nicercharters.com',
    siteName: 'Nicer Charters',
    images: [
      {
        url: '',
        width: 800,
        height: 600,
        alt: 'Nicer charter image',
      },
      {
        url: '',
        width: 1800,
        height: 1600,
        alt: 'Nicer charter image',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
