import { parseISO } from 'date-fns'

import Calendar from '@/components/calendar'
import { blockedDates } from '@/lib/cms'
import { buildCalendar } from '@/lib/utils'

const reservedDates = blockedDates.map((dateString) => parseISO(dateString))

export default function Loading() {
  const calendar = buildCalendar(reservedDates)
  return <Calendar calendar={calendar} />
}
