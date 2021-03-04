import React from 'react';
import "./ReviewItem.css";

function ReviewItem(props) {
  const {name, quantity} = props.product;
  
  return (
    <div className="ReviewItem">
      <h3>{name}</h3>
      <p>Quantity : {quantity}</p>
      <button className="cart_btn" onClick={()=>props.removeProduct(props.product)}>Remove</button>
    </div>
  )
}

export default ReviewItem;
