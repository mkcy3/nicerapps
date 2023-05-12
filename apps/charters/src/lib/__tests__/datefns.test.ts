import * as dateFns from 'date-fns'

import {
  addDays,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
  subDays,
} from '../date-fns'

describe('Date Utils', () => {
  const date1 = new Date(2023, 4, 1) // May 1st, 2023
  const date2 = new Date(2023, 4, 10) // May 10th, 2023
  const date3 = null

  describe('isSameDay', () => {
    test('should return true if two dates are the same day', () => {
      expect(isSameDay(date1, date1)).toBe(true)
    })

    test('should return false if two dates are not the same day', () => {
      expect(isSameDay(date1, date2)).toBe(false)
    })

    test('should return false if any date is null', () => {
      expect(isSameDay(date1, date3)).toBe(false)
      expect(isSameDay(date3, date2)).toBe(false)
      expect(isSameDay(date3, date3)).toBe(false)
    })
  })

  describe('isBefore', () => {
    test('should return true if the first date is before the second date', () => {
      expect(isBefore(date1, date2)).toBe(true)
    })

    test('should return false if the first date is not before the second date', () => {
      expect(isBefore(date2, date1)).toBe(false)
    })

    test('should return false if any date is null', () => {
      expect(isBefore(date1, date3)).toBe(false)
      expect(isBefore(date3, date2)).toBe(false)
      expect(isBefore(date3, date3)).toBe(false)
    })
  })

  describe('isAfter', () => {
    test('should return true if the first date is after the second date', () => {
      expect(isAfter(date2, date1)).toBe(true)
    })

    test('should return false if the first date is not after the second date', () => {
      expect(isAfter(date1, date2)).toBe(false)
    })

    test('should return false if any date is null', () => {
      expect(isAfter(date1, date3)).toBe(false)
      expect(isAfter(date3, date2)).toBe(false)
      expect(isAfter(date3, date3)).toBe(false)
    })
  })

  describe('addDays', () => {
    test('should return the date after adding days', () => {
      const result = addDays(date1, 5)
      const expected = dateFns.addDays(date1, 5)
      expect(result).toEqual(expected)
    })
  })

  describe('subDays', () => {
    test('should return the date after subtracting days', () => {
      const result = subDays(date2, 3)
      const expected = dateFns.subDays(date2, 3)
      expect(result).toEqual(expected)
    })
  })

  describe('eachDayOfInterval', () => {
    const startDate = new Date(2023, 4, 1) // May 1st, 2023
    const endDate = new Date(2023, 4, 5) // May 5th, 2023

    test('should return an array of all dates within the interval', () => {
      const interval = { start: startDate, end: endDate }
      const result = eachDayOfInterval(interval)
      const expected = dateFns.eachDayOfInterval({
        start: startDate,
        end: endDate,
      })

      expect(result).toEqual(expected)
    })

    test('should return an empty array if the start and end dates are the same', () => {
      const interval = { start: startDate, end: startDate }
      const result = eachDayOfInterval(interval)

      expect(result).toEqual([])
    })

    test('should return empty array if any date in the interval is null', () => {
      const interval1 = { start: null, end: endDate }
      const interval2 = { start: startDate, end: null }
      const interval3 = { start: null, end: null }

      expect(eachDayOfInterval(interval1)).toStrictEqual([])
      expect(eachDayOfInterval(interval2)).toStrictEqual([])
      expect(eachDayOfInterval(interval3)).toStrictEqual([])
    })

    test('should respect the step option if provided', () => {
      const interval = { start: startDate, end: endDate }
      const options = { step: 2 }

      const result = eachDayOfInterval(interval, options)
      const expected = dateFns.eachDayOfInterval(
        { start: startDate, end: endDate },
        options
      )

      expect(result).toEqual(expected)
    })
  })

  describe('format', () => {
    const date = new Date(2023, 4, 1) // May 1st, 2023

    test('should format the date according to the format string', () => {
      const formatStr = 'dd MMM yyyy'
      const result = format(date, formatStr)
      const expected = dateFns.format(date, formatStr)

      expect(result).toEqual(expected)
    })

    test('should return an empty string if the date is null', () => {
      const formatStr = 'dd MMM yyyy'
      const result = format(null, formatStr)

      expect(result).toEqual('')
    })
  })
})
