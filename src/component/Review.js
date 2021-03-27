import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart } from "../utilities/databaseManager";
import ReviewItem from './ReviewItem';
import Cart from './Cart';
import happyImage from '../images/giphy.gif';
import { useHistory } from 'react-router';

function Review() {
  const [cart, setCart] = useState([]);
  const [oderPlaced] = useState(false);

  const history = useHistory();
  const handleProceedCheckout = () => {
    history.push('/shipment');
  }

  const handleRemoveProduct = (product)=> {
    const newCart = cart.filter(pd => pd.key !== product.key);
    setCart(newCart);
    removeFromDatabaseCart(product.key);
  }

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);

    fetch(`http://localhost:5000/productsByKeys`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
  }, [])

  return (
    <div className="Review">
      <div className="product_container">
        {
          cart.map(pd => 
            <ReviewItem 
              key={pd.key} 
              product={pd} 
              removeProduct={handleRemoveProduct}
            />
          )
        }
        {oderPlaced && <img src={happyImage} alt="" />}
      </div>
      <div className="cart_container">
        <Cart cart={cart}>
          <button className="cart_btn" onClick={handleProceedCheckout}>Place Order</button>
        </Cart>
      </div>
      
    </div>
  )
}

export default Review;
