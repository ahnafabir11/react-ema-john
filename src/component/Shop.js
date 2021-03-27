import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from './Product';
import Cart from './Cart';
import { addToDatabaseCart, getDatabaseCart } from '../utilities/databaseManager';
import { Link } from 'react-router-dom';


function Shop() {
  document.title = 'Ema-Jhon | Shop';
  const [products, setProductes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(()=> {
    fetch(`http://localhost:5000/products`)
      .then(res => res.json())
      .then(data => setProductes(data))
  },[])

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch(`http://localhost:5000/productsByKeys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productKeys)
    })
      .then(res => res.json())
      .then(data => setCart(data))
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