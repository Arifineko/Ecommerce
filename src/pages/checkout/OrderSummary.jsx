import dayjs from "dayjs"
import formatMoney from "../../utils/money,"
import { DeliveryOptions } from "./DeliveryOptions"
import axios from "axios"
import { CartItemDetails } from "./CartItemDetails"

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                const selectedOption = deliveryOptions.find(delivery => {
                    return delivery.id === cartItem.deliveryOptionId
                })

                return <div key={cartItem.id} className="cart-item-container">
                    <div className="delivery-date">
                        Delivery date: {dayjs(selectedOption.
                            estimatedDeliveryTimeMs
                        ).format('dddd, MMMM D')}
                    </div>

                    <div className="cart-item-details-grid">
                        <img className="product-image"
                            src={cartItem.product.image} />

                        <CartItemDetails cartItem={cartItem} loadCart={loadCart} />

                        <div className="delivery-options">
                            <div className="delivery-options-title">
                                Choose a delivery option:
                            </div>

                            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}