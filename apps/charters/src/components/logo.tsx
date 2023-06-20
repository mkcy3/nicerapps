import Image from 'next/image'

import logo from '@/assets/sail-logo.png'

export default function Logo() {
  return <Image className="h-8 w-auto" src={logo} alt="Nicer charters logo" />
}
