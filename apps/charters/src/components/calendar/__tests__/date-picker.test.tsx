import { render, screen, within } from '@testing-library/react'

import mockedCalendarData from '../__mocks__/calendar.json'
import DatePicker from '../date-picker'

const CALENDAR = mockedCalendarData

describe('DatePicker', () => {
  it('should render', () => {
    render(<DatePicker calendar={CALENDAR} />)
    const months = screen.getAllByRole('heading', {
      level: 2,
    })
    expect(months).toHaveLength(6)
  })
})
