/* eslint no-case-declarations: 0 */
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

const endpointSecret = process.env.STRIPE_WH_SECRET_KEY as string

export async function POST(req: NextRequest) {
  const request = await req.text()

  let event

  // Get the signature sent by Stripe
  const signature = req.headers.get('stripe-signature') as string
  try {
    event = stripe.webhooks.constructEvent(request, signature, endpointSecret)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return NextResponse.json({ status: 400 })
    }
  }

  switch (event?.type) {
    case 'payment_intent.succeeded':
      // finish roundtrip to planetscale
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(`PaymentIntent for ${paymentIntent.id} was successful!`)

      break
    case 'payment_method.attached':
      //const paymentMethod = event.data.object as Stripe.PaymentMethod

      break
    default:
      console.log(`Unhandled event type ${event?.type}.`)
  }

  return NextResponse.json(
    { message: 'successfully received' },
    { status: 200 }
  )
}
//https://github.com/vercel/next.js/issues/49739
