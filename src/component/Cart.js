import React from 'react';
import './Cart.css';

function Cart({cart}) {
  let productPrice = 0;
  let shipping = 0;
  cart.forEach(prd => {
    productPrice = productPrice + prd.price;
  });

  if (productPrice > 35) {
    shipping = 0;
  }else if (productPrice > 15) {
    shipping = 4.99;
  }else if(productPrice <= 15 && productPrice > 0){
    shipping = 12.99;
  }else if(productPrice <= 0 ){
    shipping = 0;
  }

  let tax = Number((productPrice / 15).toFixed(2));

  return (
    <div className="Cart">
      <h3>Order Summery</h3>
      <h4>Items Total : {cart.length}</h4>
      <h4>Product Price : ${productPrice}</h4>
      <h4>Shipping Cost : ${shipping}</h4>
      <h4>Tax : ${tax}</h4>
      <h4>Total Cost : ${(productPrice + shipping + tax).toFixed(2)}</h4>
    </div>
  )
}

export default Cart;