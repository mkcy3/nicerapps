import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
} from 'date-fns'

import Calendar from '@/components/calendar'
import Container from '@/components/ui/container'
import { getCurrentSucceededIntents } from '@/lib/stripe'

const reservedDates = [
  '2023-07-14',
  '2023-07-15',
  '2023-07-16',
  '2023-07-17',
  '2023-07-18',
  '2023-07-19',
  '2023-07-20',
  '2023-07-21',
  '2023-07-22',
  '2023-07-23',
  '2023-07-24',
].map((dateString) => parseISO(dateString))

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

function buildCalendar(bookedDates: Date[]) {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), 4, 1, 0, 0, 0) // May is month 4 in JavaScript's Date object
  const endOfMonth = new Date(today.getFullYear(), 9, 31, 0, 0, 0) // October is month 9 in JavaScript's Date object
  const months = eachMonthOfInterval({ start: startOfMonth, end: endOfMonth })
  const monthObjects = months.map((month) => {
    const daysInMonth = eachDayOfInterval({
      start: month,
      end: new Date(month.getFullYear(), month.getMonth() + 1, 0),
    })

    const dayDates = daysInMonth.map((day, idx) => {
      const [localDay, monthDay, dateISO, month] = format(
        day,
        'e, d, yyyy-MM-dd, L'
      ).split(', ')

      const dateObj = {
        localDay: Number(localDay),
        monthDay: Number(monthDay),
        dateISO,
        date: day,
        isBooked: false,
        isDisabled: false,
      }

      if (isSameDay(day, bookedDates[0])) {
        dateObj.isBooked = true
        bookedDates.shift()
      }

      if (
        isBefore(day, today) ||
        (month === '5' && idx < 24) ||
        (month === '10' && idx > 8)
      ) {
        dateObj.isDisabled = true
      }

      return dateObj
    })

    return {
      name: format(month, 'MMMM'),
      year: month.getFullYear(),
      days: dayDates,
    }
  })
  return monthObjects
}

export default async function TripPage() {
  const today = new Date()
  const cutOffDate = new Date(today.getFullYear(), 9, 10)

  if (isAfter(today, cutOffDate))
    return (
      <Container>
        <div> end of season</div>
      </Container>
    )

  const bookedDates = await getBookedDates()
  const calendar = buildCalendar(bookedDates)
  return (
    <Container>
      <Calendar calendar={calendar} />
    </Container>
  )
}
