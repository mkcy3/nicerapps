import { render, screen } from '@testing-library/react'

import mockedCalendarData from '../__mocks__/calendar.json'
import Calendar from '../index'

const CALENDAR = mockedCalendarData

describe('Calendar', () => {
  it('should render', () => {
    render(<Calendar calendar={CALENDAR} />)
    const months = screen.getAllByRole('heading', {
      level: 2,
    })
    expect(months).toHaveLength(6)
  })
})
