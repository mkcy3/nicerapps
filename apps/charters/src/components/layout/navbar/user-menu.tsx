//reactor later
'use client'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

import { useCurrentAuth, useSignOut } from '@/lib/clerk/client'
import { cn } from '@/lib/utils'

const visitorMenu = [
  { name: 'Sign in', href: '/sign-in' },
  { name: 'Sign up', href: '/sign-up' },
]

export default function UserMenu({
  isDropDown = false,
}: {
  isDropDown?: boolean
}) {
  const { isLoaded, userId } = useCurrentAuth()
  const signOut = useSignOut()

  if (!isLoaded || !userId)
    return (
      <>
        {visitorMenu.map((item) =>
          isDropDown ? (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <Link
                  href={item.href}
                  className={cn(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </Menu.Item>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-charcoal -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50'
              )}
            >
              {item.name}
            </Link>
          )
        )}
      </>
    )

  return (
    <>
      {isDropDown ? (
        <>
          <Menu.Item>
            <Link
              href="/account"
              className={cn('block px-4 py-2 text-sm text-gray-700')}
            >
              Your Charters
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button
              className={cn('block px-4 py-2 text-sm text-gray-700')}
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </Menu.Item>
        </>
      ) : (
        <>
          <Link
            className="text-charcoal -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
            href="/account"
          >
            Your Charters
          </Link>
          <button
            className="text-charcoal -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      )}
    </>
  )
}
