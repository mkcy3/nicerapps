import { Menu, User } from 'iconoir-react'
import Image from 'next/image'

import { getCurrentUser } from '@/lib/clerk/server'

export default async function UserBar() {
  const user = await getCurrentUser()

  if (!user)
    return (
      <>
        <span className="sr-only">Open user menu</span>
        <Menu className="h-5 w-5" aria-hidden="true" />
        <User className="h-6 w-6 rounded-full" />
      </>
    )
  return (
    <>
      <span className="sr-only">Open user menu</span>
      <Menu className="h-5 w-5" aria-hidden="true" />
      <Image
        src={user.profileImageUrl}
        alt="profile img"
        className="h-6 w-6 rounded-full"
        width={30}
        height={30}
      />
    </>
  )
}
