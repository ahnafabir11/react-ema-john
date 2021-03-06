import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './Product';

function ProductDetails() {
  document.title = 'Ema-John | Product Details';
  let { productKey} = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://boiling-sands-99369.herokuapp.com/product/${productKey}`)
    .then(res => res.json())
    .then(data => setProduct(data[0]))
  }, [productKey])

  return (
    <div className="ProductDetails">
      <h1 style={{textAlign: 'center', background: 'lime'}}>Your Product Details</h1>
      <Product showAddToCart={false} product={product} />
    </div>
  )
}

export default ProductDetails;
