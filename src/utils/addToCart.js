import axios from "axios"

export const addToCart = async (productId, quantity, loadCart) => {
    try {
        await axios.post('/api/cart-items', {
            productId,
            quantity
        })
        await loadCart()
    } catch (error) {
        console.error(error)
    }
}