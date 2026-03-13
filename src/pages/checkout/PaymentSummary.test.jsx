import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter } from "react-router";


describe('Payment Summary Component', () => {
    it('Display dollars correctly', () => {

        const loadCart = vi.fn()

        const paymentSummary = {
            totalItems: 1,
            productCostCents: 1090,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 1090,
            taxCents: 109,
            totalCostCents: 1199
        }

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        )

        const rowItems = screen.getByTestId('row-items')
        const rowShipping = screen.getByTestId('row-shipping')
        const rowTotalBeforeTax = screen.getByTestId('row-total-before-tax')
        const rowEstimatedTax = screen.getByTestId('row-estimated-tax')
        const rowOrderTotal = screen.getByTestId('row-order-total')

        expect(rowItems).toHaveTextContent('$10.90')
        expect(rowShipping).toHaveTextContent('$0.00')
        expect(rowTotalBeforeTax).toHaveTextContent('$10.90')
        expect(rowEstimatedTax).toHaveTextContent('$1.09')
        expect(rowOrderTotal).toHaveTextContent('$11.99')
    })
})