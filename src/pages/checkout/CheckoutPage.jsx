import './checkout-header.css';
import './CheckoutPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null)

  const fetchCheckoutData = async () => {
    const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    setDeliveryOptions(response.data)
  }

  const fetchPaymentSummaryData = async () => {
    const response = await axios.get('/api/payment-summary')
    setPaymentSummary(response.data)
  }

  useEffect(() => {
    fetchCheckoutData()
  }, []);

  useEffect(() => {
    fetchPaymentSummaryData()
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}