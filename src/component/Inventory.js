import React from 'react';

function Inventory() {
  const handleAddProduct = ()=> {
    const product = {};
    fetch(`https://boiling-sands-99369.herokuapp.com/addProduct`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(product)
    })
  }

  return (
    <div className="Inventory">
      <form action="">
        <p><span>Name</span> : <input type="text"/></p>
        <p><span>Price</span> : <input type="text"/></p>
        <p><span>Quantity</span> : <input type="text"/></p>
        <p><span>Product Image</span> : <input type="file"/></p>
        <button type="submit" onClick={handleAddProduct}>Add Product</button>
      </form>
      
    </div>
  )
}

export default Inventory
