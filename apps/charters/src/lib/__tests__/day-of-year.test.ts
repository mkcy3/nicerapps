import {
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  isWithinSixtyDays,
} from '../day-of-year'

describe('Date Functions', () => {
  describe('isSameDay', () => {
    it('should return true when day1 and day2 are the same', () => {
      expect(isSameDay(300, 300)).toBe(true)
    })

    it('should return false when day1 and day2 are different', () => {
      expect(isSameDay(300, 301)).toBe(false)
    })
  })

  describe('isBefore', () => {
    it('should return true when day1 is before day2', () => {
      expect(isBefore(300, 301)).toBe(true)
    })

    it('should return false when day1 is equal to or after day2', () => {
      expect(isBefore(300, 300)).toBe(false)
      expect(isBefore(301, 300)).toBe(false)
    })
  })

  describe('format', () => {
    it('should format the day in the specified format', () => {
      expect(format(300, 'MMMM dd, yyyy')).toBe('October 27, 2023')
    })

    it('should return an empty string if the day is 0', () => {
      expect(format(0, 'MMMM dd, yyyy')).toBe('')
    })
  })

  describe('isWithinInterval', () => {
    const interval = { start: 298, end: 302 }

    it('should return true when the day is within the interval', () => {
      expect(isWithinInterval(300, interval)).toBe(true)
    })

    it('should return false when the day is not within the interval', () => {
      expect(isWithinInterval(303, interval)).toBe(false)
    })

    it('should return false when either the start or end of the interval is 0', () => {
      expect(isWithinInterval(300, { start: 0, end: 302 })).toBe(false)
      expect(isWithinInterval(300, { start: 298, end: 0 })).toBe(false)
    })
  })

  describe('isWithinSixtyDays', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('returns true when the difference is within 60 days', () => {
      const today = new Date(2023, 1, 1)
      vi.setSystemTime(today)

      expect(isWithinSixtyDays(4)).toEqual(true)
    })

    it('returns false when the difference is more than 60 days', () => {
      const today = new Date(2023, 1, 1)
      vi.setSystemTime(today)

      expect(isWithinSixtyDays(100)).toEqual(false)
    })
  })
})
