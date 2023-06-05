'use client'
import { Cancel } from 'iconoir-react'

import { closeBanner } from './action'

export default function Close() {
  async function handleClose() {
    await closeBanner()
  }
  return (
    <button
      type="button"
      className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
      onClick={handleClose}
    >
      <span className="sr-only">Dismiss</span>
      <Cancel className="h-5 w-5 text-white" aria-hidden="true" />
    </button>
  )
}
