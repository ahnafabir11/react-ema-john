import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../fakeData/index';
import Product from './Product';
import Cart from './Cart';


function Shop() {
  const first10 = fakeData.slice(0, 10);
  const [products] = useState(first10);
  const [cart, setCart] = useState([]);

  const handleAddProduct = (product)=> {
    setCart([...cart, product]);
  }

  return (
    <div className="Shop">
      <div className="product_container">
      {
          products.map(pd => <Product 
            key={pd.key} 
            id={pd.key} 
            name={pd.name} 
            imgSrc={pd.img} 
            seller={pd.seller} 
            stock={pd.stock} 
            price={pd.price} 
            features={pd.features}
            handleAddProduct={handleAddProduct}
          />)
      }
      </div>
      
      <div className="cart_container">
        <Cart cart={cart}/>
      </div>
    </div>
  )
}

export default Shop;