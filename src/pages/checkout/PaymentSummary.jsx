import axios from "axios";
import formatMoney from "../../utils/money";
import { useNavigate } from "react-router";


export function PaymentSummary({ paymentSummary, loadCart }) {
    const navigate = useNavigate()

    const createOrder = async () => {
        await axios.post('/api/orders')
        await loadCart()
        navigate('/orders')
    }

    return (
        <>
            {paymentSummary && (
                <div className="payment-summary">
                    <div className="payment-summary-title">
                        Payment Summary
                    </div>

                    <div className="payment-summary-row" data-testid="row-items">
                        <div>Items ({paymentSummary.totalItems}):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.productCostCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row" data-testid="row-shipping">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.shippingCostCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row subtotal-row" data-testid="row-total-before-tax">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row" data-testid="row-estimated-tax">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.taxCents)}
                        </div>
                    </div>

                    <div className="payment-summary-row total-row" data-testid="row-order-total">
                        <div>Order total:</div>
                        <div className="payment-summary-money">
                            {formatMoney(paymentSummary.totalCostCents)}
                        </div>
                    </div>

                    <button onClick={createOrder} className="place-order-button button-primary" data-testid='place-order-button'>
                        Place your order
                    </button>
                </div>
            )}
        </>
    )
}