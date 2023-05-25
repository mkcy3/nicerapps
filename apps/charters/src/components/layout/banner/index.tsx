'use client'
import { Cancel } from 'iconoir-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {isOpen && (
        <div className="flex items-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
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
              All charters are 50% off for the first 10 bookings. &nbsp;
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Dismiss</span>
              <Cancel className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
