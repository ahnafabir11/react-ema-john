import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardFrom from './SimpleCardFrom';
// import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeKsyFtp2clz3dNbZNfDSOsjFb69d8nvE2eBjxmGwsNgRi2JWsoJk5GT8au9Ezc44Zg726lUcoaN3hjJHYH8HtY00IIU0b6wA');

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardFrom handlePayment={handlePayment} />
    </Elements>
  )
}

export default ProcessPayment;