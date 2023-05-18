import { formatAmountForDisplay } from '../utils'

describe('formatAmountForDisplay', () => {
  it('should format the amount with canadian currency symbol', () => {
    const amount = 123456
    const currency = 'CAD'

    const formattedAmount = formatAmountForDisplay(amount, currency)

    expect(formattedAmount).toEqual('$1,234.56')
  })

  it('should format the amount with euro currency symbol', () => {
    const amount = 7890
    const currency = 'EUR'

    const formattedAmount = formatAmountForDisplay(amount, currency)

    expect(formattedAmount).toEqual('€78.90')
  })
})
