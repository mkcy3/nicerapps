import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})
export async function getCurrentSucceededIntents() {
  const currentDate = new Date()
  const currentYear = currentDate.getUTCFullYear()

  const startYearUnix = Math.floor(Date.UTC(currentYear, 0, 1) / 1000)
  const endYearUnix = Math.floor(Date.UTC(currentYear, 11, 31) / 1000)

  const result = await stripe.paymentIntents.search({
    query: `created>${startYearUnix} AND created<${endYearUnix} AND status:'succeeded' AND -metadata['charterStartDate']:null`,
  })
  return result.data
}
export async function getPricePerDay(nights: number) {
  const charterDays = nights + 1

  const prices = await stripe.prices.list()

  const matchingDayPrice = prices.data.find((price) => {
    const nicknameParts = price.nickname?.split('-') ?? ['1']

    if (nicknameParts.length === 2) {
      const min = parseInt(nicknameParts[0])
      const max = parseInt(nicknameParts[1])
      return charterDays >= min && charterDays <= max
    }

    return parseInt(nicknameParts[0]) === charterDays
  })?.unit_amount as number

  return matchingDayPrice
}

/* eslint-disable */
export function stripeErrorHandling(err: unknown) {
  if (err instanceof Stripe.errors.StripeError) {
    switch (err.type) {
      case 'StripeCardError':
        // A declined card error
        err.message // => e.g. "Your card's expiration year is invalid."
        break
      case 'StripeInvalidRequestError':
        // Invalid parameters were supplied to Stripe's API
        console.log(err)
        break
      case 'StripeAPIError':
        // An error occurred internally with Stripe's API
        console.log(err)
        break
      case 'StripeConnectionError':
        // Some kind of error occurred during the HTTPS communication
        console.log(err)
        break
      case 'StripeAuthenticationError':
        // You probably used an incorrect API key
        console.log(err)
        break
      case 'StripeRateLimitError':
        // Too many requests hit the API too quickly
        console.log(err)
        break
      case 'StripePermissionError':
        // Access to a resource is not allowed
        console.log(err)
        break
      case 'StripeIdempotencyError':
        // An idempotency key was used improperly
        console.log(err)
        break
      case 'StripeInvalidGrantError':
        // InvalidGrantError is raised when a specified code doesn't exist, is
        // expired, has been used, or doesn't belong to you; a refresh token doesn't
        // exist, or doesn't belong to you; or if an API key's mode (live or test)
        // doesn't match the mode of a code or refresh token.
        console.log(err)
        break
    }
  } else {
    // Handle any other type of unexpected error
    throw new Error(err as string)
  }
}
