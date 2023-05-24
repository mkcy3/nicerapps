import { auth } from '@clerk/nextjs'
import { differenceInCalendarDays, parseISO } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

import { getCharterStatement } from '@/lib/stripe'
import { stripeErrorHandling } from '@/lib/stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})
export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { searchParams } = new URL(req.url)

  const startDate = parseISO(searchParams.get('start') as string)
  const endDate = parseISO(searchParams.get('end') as string)
  const nights = differenceInCalendarDays(endDate, startDate)
  const isSleeping = searchParams.get('sleep') === 'true'
  const passengers = searchParams.get('passengers')
  const statement = await getCharterStatement(nights, isSleeping)

  const stripeMetadata = {
    clerkUserId: userId,
    charterStartDate: searchParams.get('start'),
    charterEndDate: searchParams.get('end'),
    sleepAboard: isSleeping.toString(),
    passengers,
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: statement[4].amount,
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      metadata: stripeMetadata,
    })
    return NextResponse.json(paymentIntent)
  } catch (e) {
    stripeErrorHandling(e)
  }

  return new Response('Something else went wrong', {
    status: 500,
  })
}
