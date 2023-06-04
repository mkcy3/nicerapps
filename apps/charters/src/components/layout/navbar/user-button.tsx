import { currentUser } from '@clerk/nextjs'
import { Menu, User } from 'iconoir-react'
import Image from 'next/image'

export default async function UserBar() {
  const user = await currentUser()
  if (!user)
    return (
      <>
        <span className="sr-only">Open user menu</span>
        <Menu className="h-5 w-5" aria-hidden="true" />
        <User className="h-5 w-5 rounded-full" />
      </>
    )
  return (
    <>
      <span className="sr-only">Open user menu</span>
      <Menu className="h-5 w-5" aria-hidden="true" />
      <Image
        src={user.profileImageUrl}
        alt="profile img"
        className="h-5 w-5 rounded-full"
      />
    </>
  )
}
