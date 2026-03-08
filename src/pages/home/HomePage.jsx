import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductGrid } from './ProductsGrid';

export function HomePage({ cart, loadCart }) {
  return (
    <>
      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductGrid loadCart={loadCart} />
      </div>
    </>
  );
}