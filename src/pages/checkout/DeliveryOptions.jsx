import dayjs from "dayjs";
import formatMoney from "../../utils/money";
import axios from "axios";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {

    const handleDeliveryOptionChange = async (deliveryOptionId) => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId
        })
        await loadCart()
    }

    return (
        <>
            {deliveryOptions.map(deliveryOption => (
                <div className="delivery-option" key={deliveryOption.id} onClick={() => handleDeliveryOptionChange(deliveryOption.id)}>
                    <input
                        type="radio"
                        checked={deliveryOption.id === cartItem.deliveryOptionId}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.productId}`}
                    />
                    <div>
                        <div className="delivery-option-date">
                            {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>
                        <div className="delivery-option-price">
                            {deliveryOption.priceCents > 0 ? formatMoney(deliveryOption.priceCents) : 'FREE'} - Shipping
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}