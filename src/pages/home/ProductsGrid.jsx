import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import { useSearchParams } from "react-router";
export function ProductGrid({ loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search')
    const url = search ? `/api/products?search=${search}` : '/api/products'

    const getProducts = async () => {
        try {
            const response = await axios.get(url)
            setProducts(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [search])

    return (
        <div className="products-grid">
            {products.map((product) => (
                <Product key={product.id} product={product} loadCart={loadCart} />
            )
            )}
        </div>
    )
}