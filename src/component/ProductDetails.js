import React from 'react';
import { useParams } from 'react-router-dom';
import fackData from '../fakeData';
import Product from './Product';

function ProductDetails() {
  let { productKey} = useParams();
  const product = fackData.find(p => p.key === productKey);

  return (
    <div className="ProductDetails">
      <h1 style={{textAlign: 'center', background: 'lime'}}>Your Product Details</h1>
      <Product showAddToCart={false} product={product} />
    </div>
  )
}

export default ProductDetails;
