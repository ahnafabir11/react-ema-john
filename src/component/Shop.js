import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../fakeData/index';
import Product from './Product';
import Cart from './Cart';
import { addToDatabaseCart, getDatabaseCart } from '../utilities/databaseManager';
import { Link } from 'react-router-dom';


function Shop() {
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map(pdKey => {
      const product = fakeData.find(pd => pd.key === pdKey);
      product.quantity = savedCart[pdKey];
      return product;
    })
    setCart(previousCart);
  }, [])

  const handleAddProduct = (product)=> {
    const toBeAdded = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAdded);
    let count = 1;
    let newCart;

    if(sameProduct){
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAdded);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }

    setCart(newCart);
    addToDatabaseCart(product.key, product.quantity);
  }

  return (
    <div className="Shop">
      <div className="product_container">
      {
          products.map(pd => <Product 
            key={pd.key}
            showAddToCart={true}
            product={pd}
            handleAddProduct={handleAddProduct}
          />)
      }
      </div>
      
      <div className="cart_container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className='cart_btn'>Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  )
}

export default Shop;