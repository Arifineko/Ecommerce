import dayjs from "dayjs"
import { Fragment } from "react"
import { Link } from "react-router"
import { addToCart } from "../../utils/addToCart"

export function OrdersGrid({ order, orderId, loadcart }) {
    return (
        order.map(orderProduct => {
            return (
                <Fragment key={orderProduct.productId}>
                    <div className="product-image-container">
                        <img src={orderProduct.product.image} />
                    </div>

                    <div className="product-details">
                        <div className="product-name">
                            {orderProduct.product.name}
                        </div>
                        <div className="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                        </div>
                        <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                        </div>
                        <button onClick={() => addToCart(orderProduct.productId, 1, loadcart)} className="buy-again-button button-primary">
                            <img className="buy-again-icon" src="images/icons/buy-again.png" />
                            <span className="buy-again-message">Add to Cart</span>
                        </button>
                    </div>

                    <div className="product-actions">
                        <Link to={`/tracking/${orderId}/${orderProduct.productId}`}>
                            <button className="track-package-button button-secondary">
                                Track package
                            </button>
                        </Link>
                    </div>
                </Fragment>
            )
        })
    )
}