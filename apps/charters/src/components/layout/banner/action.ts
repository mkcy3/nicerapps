// NO SECRETS! Only set cookies for now, alpha security issues
'use server'

import { cookies } from 'next/headers'

export async function closeBanner() {
  //FIX: here too
  // @ts-expect-error github.com/vercel/next.js/issues/49259
  cookies().set('banner', 'true')
}
