import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, removeFromDatabaseCart } from "../utilities/databaseManager";
import fakeData from '../fakeData';
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

    const counts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = saveCart[key];
      return product;
    })
    setCart(counts);
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
