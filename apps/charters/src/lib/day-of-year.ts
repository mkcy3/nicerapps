import * as dateFns from 'date-fns'

export function isSameDay(day1: number, day2: number) {
  if (day1 === day2) {
    return true
  }
  return false
}
export function isBefore(day1: number, day2: number) {
  if (day1 < day2) {
    return true
  }
  return false
}
export function format(day: number, format: string) {
  if (day === 0) {
    return ''
  }
  const date = dateFns.parse(day.toString(), 'D', new Date(), {
    useAdditionalDayOfYearTokens: true,
  })
  return dateFns.format(date, format)
}

export function parseToDate(dayOfYear: number) {
  if (dayOfYear === 0) return null
  return dateFns.parse(dayOfYear.toString(), 'D', new Date(), {
    useAdditionalDayOfYearTokens: true,
  })
}
export function isWithinInterval(
  day: number,
  interval: { end: number; start: number }
) {
  const { start, end } = interval
  if (start === 0 || end === 0) {
    return false
  }

  const date = parseToDate(day) as Date
  const startDate = parseToDate(start) as Date
  const endDate = parseToDate(end) as Date

  return dateFns.isWithinInterval(date, { start: startDate, end: endDate })
}

export function isWithinSixtyDays(startDate: number) {
  const date1 = parseToDate(startDate) as Date
  const difference = dateFns.differenceInDays(date1, new Date())

  if (difference > 60) {
    return false
  }

  return true
}
