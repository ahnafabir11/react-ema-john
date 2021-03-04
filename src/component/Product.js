import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Product({product, handleAddProduct, showAddToCart}) {
  const {key, name, img, seller, stock, price, features} = product;
  return (
    <div className="Product">
      <div className="product_img">
        <img src={img} alt={name}/>
      </div>

      <div className="product_details">
        <h4>
          <Link to={"/product/" + key}>{name}</Link>
        </h4>
        <p>by: {seller}</p>
        <div className="item_description">
          <div>
            <p><b>Product Price : </b> ${price}</p>
            <p><b>Available Stock : </b> {stock}</p>
            
            { showAddToCart === true && (
              <button className="cart_btn" onClick={()=> handleAddProduct(product)}>
              <FontAwesomeIcon icon={faShoppingCart} /> add to cart
              </button>)
            }
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
