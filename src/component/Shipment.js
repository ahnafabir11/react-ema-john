import './Shipment.css';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../App';

function Shipment() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [logedInUser, ] = useContext(UserContext);
  const onSubmit = data => {
    console.log(data)
  };

  console.log(watch("example"));

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
