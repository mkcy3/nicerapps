import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

import { getCharterStatement } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  console.log(req)
  //const statement = await getCharterStatement(nights, isSleeping)

  // const stripeMetadata = {
  //     clerkUserId: clerkUser?.id as string,
  //     clerkEmail: clerkUser?.emailAddresses[0].emailAddress as string,
  //     charterStartDate,
  //     charterEndDate,
  //     //sleepAboard: isSleeping.toString(),
  //     passengers,
  //   }

  // try {
  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount: balance.getAmount(),
  //       currency: 'cad',
  //       automatic_payment_methods: { enabled: true },
  //       metadata: stripeMetadata,
  //     })
  //     return { stripePi: paymentIntent, statement: statement }
  //   } catch (e) {
  //     stripeErrorHandling(e)
  //   }

  return NextResponse.json({
    message: 'Success',
  })
}
