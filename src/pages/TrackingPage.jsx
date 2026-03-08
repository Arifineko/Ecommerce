import { useParams, Link } from 'react-router'
import './Tracking.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Header } from '../components/Header'


const TrackingPage = ({ cart }) => {
    const { orderId, productId } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchOrderById = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        }

        fetchOrderById()
    }, [orderId])

    if (!order) return null;

    const products = order.products.find(orderProduct => orderProduct.productId === productId)
    const totalDeliveryTimeMs = products.estimatedDeliveryTimeMs - order.orderTimeMs
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs

    const deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100

    let statusDelivery = ''

    if (deliveryPercent < 33) {
        statusDelivery = 'isPreparing'
    } else if (deliveryPercent >= 33 && deliveryPercent < 100) {
        statusDelivery = 'isShipped'
    } else if (deliveryPercent >= 100) {
        statusDelivery = 'isDelivered'
    }

    return (
        <>
            <title>Tracking</title>

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link
                        className="back-to-orders-link link-primary"
                        to="/orders"
                    >
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(products.estimatedDeliveryTimeMs).format('dddd, D MMMM')}
                    </div>

                    <div className="product-info">
                        {products.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {products.quantity}
                    </div>

                    <img
                        className="product-image"
                        src={products.product.image}
                        alt="Product"
                    />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${statusDelivery === 'isPreparing' && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${statusDelivery === 'isShipped' && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${statusDelivery === 'isDelivered' && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div style={{ width: `${deliveryPercent}%` }} className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackingPage
