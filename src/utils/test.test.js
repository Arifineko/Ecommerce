import { expect, it } from 'vitest'
import formatMoney from './money,'

it('formats 1999 cents to be $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99')
    expect(formatMoney(2000)).toBe('$20.00')
})

