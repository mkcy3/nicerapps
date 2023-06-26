import { cookies } from 'next/headers'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import Close from './close'

export default function Banner({ className }: { className?: string }) {
  const cookieStore = cookies()
  //FIX: types and returns github.com/vercel/next.js/issues/49259
  const isOpen = cookieStore.get('banner')

  return (
    <>
      {!isOpen && (
        <div
          className={cn(
            'absolute inset-x-0 z-10 flex items-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1',
            className
          )}
        >
          <p className="text-sm leading-6 text-white">
            <Link href="/trip">
              <strong className="font-semibold">2023 Season</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              All charters are 50% off for the first 3 bookings. &nbsp;
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
          <div data-testid="close-banner" className="flex flex-1 justify-end">
            <Close />
          </div>
        </div>
      )}
    </>
  )
}
