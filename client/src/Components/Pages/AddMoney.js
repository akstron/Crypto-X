import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import './AddMoney.css'
const AddMoney = () => {
    const [amount, setAmount] = useState(null);
  const [msg, setMsg] = useState();
  function getAmount(val){
    setAmount(val.target.value);
    setMsg(null);
  }
  
  const makePayment = token => {

    const body = {
      token,
      amount
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(process.env.REACT_APP_BACKEND+'/payment', {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
        if(status === 200){
          setMsg("Successful");
        }else{
          setMsg("Failed");
        }
        setAmount(null);
      })
      .catch((error) => {
        console.log(error)
        setAmount(null);
        setMsg("Failed");
      });
  };

  return (

    <div className="container card">
      <div class="card-header">
          <h2> Pay with Card</h2>
      </div>
      <div className="card-body card-title">
            <Form.Control type="text" placeHolder="Enter amount" value={amount} onChange={getAmount} id="amount" />
      

        <StripeCheckout
          stripeKey={'pk_test_51Jldb2SHFt3ssNH8jX41bFxefq3pBk4Mv1rG9Y98wn9Pj4SFeNKlNaWp0clLq3tt7nTIK3Yr25y1MuympJXBm3Lj00TTjERArm'}
          token={makePayment}
          name="Add money in wallet"
          currency="INR"
          amount={amount * 100}
        >
          <button className="btn blue btn-sm btn-primary">
            Add money {amount} <del>&#2352;</del>  in wallet
          </button>
        </StripeCheckout>
        </div>
      <div className="card-footer text-muted">
        {msg || 'You will redirected to payment gateway' }
      </div>
    </div>
  );
}

export default AddMoney;