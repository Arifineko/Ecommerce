import axios from "axios"
import formatMoney from "../../utils/money,"
import { useState } from "react"

export function CartItemDetails({ cartItem, loadCart }) {
    const [isUpdate, setIsUpdate] = useState(false)
    const [inputQuantity, setInputQuantity] = useState(cartItem.quantity)

    const updateInputQuantity = (e) => {
        setInputQuantity(e.target.value)
    }

    const updateCartQuantity = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            quantity: Number(inputQuantity)
        })
        await loadCart()
        setIsUpdate(prev => !prev)
    }
    return (
        <div className="cart-item-details">
            <div className="product-name">
                {cartItem.product.name}
            </div>
            <div className="product-price">
                {formatMoney(cartItem.product.priceCents)}
            </div>
            <div className="product-quantity">
                <span>
                    Quantity: {isUpdate && <input value={inputQuantity} onChange={updateInputQuantity} style={{ width: '50px' }} type="text" />} <span className="quantity-label">{cartItem.quantity}</span>
                </span>
                <span onClick={updateCartQuantity} className="update-quantity-link link-primary">
                    Update
                </span>
                <span className="delete-quantity-link link-primary" onClick={async () => {
                    await axios.delete(`/api/cart-items/${cartItem.productId}`)
                    await loadCart()
                }}>
                    Delete
                </span>
            </div>
        </div>
    )
}