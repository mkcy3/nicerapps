import { render, screen, within } from '@testing-library/react'

import DatePicker from '../date-picker'
import calendarData from './calendar.json'

const CALENDAR = calendarData

describe('DatePicker', () => {
  test('renders', () => {
    render(<DatePicker calendar={CALENDAR} />)
    const months = screen.getAllByRole('heading', {
      level: 2,
    })
    expect(months).toHaveLength(6)
  })
})
