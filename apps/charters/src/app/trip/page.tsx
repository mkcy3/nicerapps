import {
  eachDayOfInterval,
  eachMonthOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
} from 'date-fns'

import DatePicker from '@/components/calendar/date-picker'
import Container from '@/components/ui/container'
import { prisma } from '@/lib/prisma'

async function getBookedDates() {
  // explicitly set bookedDates as it fails ci otherwise, charter: any
  const bookedDates: { endDate: Date; startDate: Date }[] =
    await prisma.charter.findMany({
      select: {
        startDate: true,
        endDate: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    })

  const rangeDates = bookedDates
    .map((charter) => {
      return eachDayOfInterval({
        start: charter.startDate,
        end: charter.endDate,
      })
    })
    .flat()

  return rangeDates
}

function buildCalendar(bookedDates: Date[]) {
  const today = new Date()
  const startOfMonth = new Date(2023, 4, 1) // May is month 4 in JavaScript's Date object
  const endOfMonth = new Date(2023, 9, 31) // October is month 9 in JavaScript's Date object
  const months = eachMonthOfInterval({ start: startOfMonth, end: endOfMonth })
  const monthObjects = months.map((month) => {
    const daysInMonth = eachDayOfInterval({
      start: month,
      end: new Date(month.getFullYear(), month.getMonth() + 1, 0),
    })

    const dayDates = daysInMonth.map((day, idx) => {
      const [localDay, monthDay, date, month] = format(
        day,
        'e, d, yyyy-MM-dd, L'
      ).split(', ')
      const dayOfYear = format(day, 'D', { useAdditionalDayOfYearTokens: true })
      const dateObj = {
        localDay: Number(localDay),
        monthDay: Number(monthDay),
        dayOfYear: Number(dayOfYear),
        date,
        isBooked: isSameDay(day, bookedDates[0]),
      }
      if (isSameDay(day, bookedDates[0])) {
        bookedDates.shift()
      }

      if (isBefore(day, today)) {
        return { ...dateObj, isDisabled: true }
      }
      if (month === '5' && idx < 24) {
        return { ...dateObj, isDisabled: true }
      }
      if (month === '10' && idx > 8) {
        return { ...dateObj, isDisabled: true }
      }

      return { ...dateObj, isDisabled: false }
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
      <DatePicker calendar={calendar} />
    </Container>
  )
}
