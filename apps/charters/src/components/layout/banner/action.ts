// NO SECRETS! Only set cookies for now, alpha security issues
'use server'

import { cookies } from 'next/headers'

export async function closeBanner() {
  //FIX: here too
  /* eslint-disable-next-line */
  //@ts-ignore github.com/vercel/next.js/issues/49259
  cookies().set('banner', 'true')
}
