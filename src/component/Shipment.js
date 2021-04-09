import './Shipment.css';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../App';
import { getDatabaseCart, processOrder } from '../utilities/databaseManager';
import ProcessPayment from './ProcessPayment/ProcessPayment';

function Shipment() {
  const { register, handleSubmit, errors } = useForm();
  const [logedInUser, ] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null);

  const onSubmit = data => {
    setShippingData(data);
  };

  const handlePaymentSuccess = (paymentId)=> {
    const savedCart = getDatabaseCart();
    const orderDetails = { 
      ...logedInUser, 
      producuts: savedCart,
      paymentId,
      shipment: shippingData,
      orderTime: new Date()
    }
    fetch(`https://boiling-sands-99369.herokuapp.com/addOrder`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your Order is Successfull!')
        }
      })
  }

  return (
    <div className="Shipment">
      <div className="row">
        <div className="col-md-6" style={{ display: shippingData ? 'unset' : 'none' }}>
          <h2 className="py-4">Make Paymen</h2>
          <ProcessPayment handlePayment={handlePaymentSuccess} />
        </div>

        <div className="col-md-6" style={{ display: shippingData ? 'none' : 'unset' }}>
          <form onSubmit={handleSubmit(onSubmit)} className="shipment-form">
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
        </div>
      </div>
    </div>
  );
}

export default Shipment;
