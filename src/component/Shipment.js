import './Shipment.css';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../App';
import { getDatabaseCart, processOrder } from '../utilities/databaseManager';

function Shipment() {
  const { register, handleSubmit, errors } = useForm();
  const [logedInUser, ] = useContext(UserContext);
  const onSubmit = data => {
    const savedCart = getDatabaseCart();
    const orderDetails = {...logedInUser, producuts: savedCart, shipment: data, orderTime: new Date()}
    fetch(`http://localhost:5000/addOrder`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        alert('Your Order is Successfull!')
      }
    })
  };

  return (
    <form onSubmit = { handleSubmit(onSubmit) } >
      <input name="name" placeholder="Your name" defaultValue={logedInUser?.name} ref = { register({ required: true }) } />
      { errors.name && <span>This field is required</span> }
      <input name="email" placeholder="Your email" defaultValue={logedInUser?.email} ref={register({ required: true })} />
      { errors.email && <span>This field is required</span>}
      <input name="address" placeholder="Your address" ref={register({ required: true })} />
      { errors.address && <span>This field is required</span>}
      <input name="phone" placeholder="Your phone" ref={register({ required: true })} />
      { errors.address && <span>This field is required</span>}
      
      <input type="submit" />
    </form>
  );
}

export default Shipment;
