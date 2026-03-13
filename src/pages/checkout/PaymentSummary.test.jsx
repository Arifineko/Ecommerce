import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect } from "vitest";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";


vi.mock('axios')

describe('Payment Summary Component', () => {
    let paymentSummary
    let loadCart

    beforeEach(() => {
        paymentSummary = {
            totalItems: 1,
            productCostCents: 1090,
            shippingCostCents: 0,
            totalCostBeforeTaxCents: 1090,
            taxCents: 109,
            totalCostCents: 1199
        }

        loadCart = vi.fn()
    })


    it('Display dollars correctly', () => {

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

    it('places an order', async () => {
        const loadCart = vi.fn()

        function Location() {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>;
        }

        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        )

        const placeOrderButton = screen.getByTestId('place-order-button')


        await user.click(placeOrderButton)

        expect(axios.post).toHaveBeenCalledWith('/api/orders')
        expect(loadCart).toHaveBeenCalled()
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
    })
})