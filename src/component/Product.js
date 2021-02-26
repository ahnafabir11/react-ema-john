import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Product(props) {
  const {name, imgSrc, seller, stock, price, features, handleAddProduct} = props;
  return (
    <div className="Product">
      <div className="product_img">
        <img src={imgSrc} alt={name}/>
      </div>

      <div className="product_details">
        <h4>{name}</h4>
        <p>by: {seller}</p>
        <div className="item_description">
          <div>
            <p><b>Product Price : </b> ${price}</p>
            <p><b>Available Stock : </b> {stock}</p>
            <button className="cart_btn" onClick={()=>handleAddProduct(props)}>
              <FontAwesomeIcon icon={faShoppingCart} /> add to cart
            </button>
          </div>

          <div>
            <h3>Features</h3>
            {
              features.map((feature, index) => {
                return <li key={index}>
                {feature.description} - {feature.value}
                </li>
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;
