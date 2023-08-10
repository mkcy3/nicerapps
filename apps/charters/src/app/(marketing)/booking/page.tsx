import { eachDayOfInterval, isAfter, parseISO } from 'date-fns'

import Calendar from '@/components/calendar'
import { blockedDates } from '@/lib/cms'
import { getCurrentSucceededIntents } from '@/lib/stripe'
import { buildCalendar } from '@/lib/utils'

const reservedDates = blockedDates.map((dateString) => parseISO(dateString))

async function getBookedDates() {
  const intents = await getCurrentSucceededIntents()
  const stripeDates = intents.map((intent) => {
    const { charterStartDate, charterEndDate } = intent.metadata

    if (charterStartDate === charterEndDate) {
      return parseISO(charterStartDate)
    }

    return eachDayOfInterval({
      start: parseISO(charterStartDate),
      end: parseISO(charterEndDate),
    })
  })

  const bookedDates = stripeDates
    .flat()
    .concat(reservedDates)
    .sort((a, b) => a.getTime() - b.getTime())

  return bookedDates
}

export default async function BookingPage() {
  const today = new Date()
  const cutOffDate = new Date(today.getFullYear(), 9, 10)

  if (isAfter(today, cutOffDate)) return <div> end of season</div>

  const bookedDates = await getBookedDates()
  const calendar = buildCalendar(bookedDates)
  return <Calendar calendar={calendar} />
}
