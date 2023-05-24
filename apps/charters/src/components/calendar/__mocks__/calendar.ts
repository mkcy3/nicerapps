import { parseISO } from 'date-fns'

import { buildCalendar } from '@/lib/utils'

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

export function mockData() {
  return buildCalendar(reservedDates)
}
