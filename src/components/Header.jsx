import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';
import { useState } from 'react';

export function Header({ cart }) {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')
  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState(search || '')
  let totalQuantity = 0

  cart.forEach(item => {
    totalQuantity += item.quantity
  });

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input onChange={(e) => {
          setSearchInput(e.target.value)
        }} value={searchInput} className="search-bar" type="text" placeholder="Search" />

        <button onClick={() => navigate(`/?search=${searchInput}`)} className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}