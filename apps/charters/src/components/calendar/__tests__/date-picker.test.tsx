import { render, screen } from '@testing-library/react'

import { mockData } from '../__mocks__/calendar'
import Calendar from '../index'

const CALENDAR = mockData()

describe('Calendar', () => {
  it('should render', () => {
    render(<Calendar calendar={CALENDAR} />)
    const months = screen.getAllByRole('heading', {
      level: 2,
    })
    expect(months).toHaveLength(6)
  })
})
