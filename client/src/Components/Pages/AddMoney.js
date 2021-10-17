import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

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

    return fetch(`http://localhost:8000/payment`, {
      method: "POST",
      headers,
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
            <input type="text" placeHolder="Enter amount" value={amount} onChange={getAmount} id="amount" />
      

        <StripeCheckout
          stripeKey={process.env.PUBLISHABLE_KEY}
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
        <h2>{msg}</h2>
      </div>
    </div>
  );
}

export default AddMoney;