import * as dateFns from 'date-fns'

function handleNullDates<T>(
  dateLeft: Date | null,
  dateRight: Date | null,
  callback: (d1: Date, d2: Date) => T
): T | false {
  if (!dateLeft || !dateRight) return false
  return callback(dateLeft, dateRight)
}

export function isSameDay(dateLeft: Date | null, dateRight: Date | null) {
  return handleNullDates(dateLeft, dateRight, dateFns.isSameDay)
}

export function isBefore(dateLeft: Date | null, dateRight: Date | null) {
  return handleNullDates(dateLeft, dateRight, dateFns.isBefore)
}

export function isAfter(dateLeft: Date | null, dateRight: Date | null) {
  return handleNullDates(dateLeft, dateRight, dateFns.isAfter)
}

export function addDays(date: Date | null, days: number) {
  if (!date) return null
  return dateFns.addDays(date, days)
}

export function subDays(date: Date | null, days: number) {
  if (!date) return null
  return dateFns.subDays(date, days)
}

export function eachDayOfInterval(
  interval: { end: Date | null; start: Date | null },
  options?: { step?: number }
) {
  const { end, start } = interval
  if (!end || !start) return []
  if (isSameDay(end, start)) return []
  return dateFns.eachDayOfInterval({ end: end, start: start }, options)
}

export function format(date: Date | null, formatStr: string) {
  if (!date) return ''
  return dateFns.format(date, formatStr)
}

export { dateFns as fns }
