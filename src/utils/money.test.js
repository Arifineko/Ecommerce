import { expect, it, describe } from 'vitest'
import formatMoney from './money'

describe('formatMoney function', () => {
    it('formats 1999 cents to be $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99')
    })

    it('formats cents must be 2 decimals', () => {
        expect(formatMoney(1090)).toBe('$10.90')
        expect(formatMoney(100)).toBe('$1.00')
    })

    it('works with the number 0', () => {
        expect(formatMoney(0)).toBe('$0.00')
    })

    it('works with the negative numbers', () => {
        expect(formatMoney(-999)).toBe('-$9.99')
        expect(formatMoney(-100)).toBe('-$1.00')
    })
})