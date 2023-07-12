import React from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {

  const handleOrderConfirmation = (event) => {
event.preventDefault();
  }

  return (
    <form onSubmit={handleOrderConfirmation}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="street">Street Address</label>
        <input type="text" id="street" />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div>
        <label htmlFor="postal">ZIP Code</label>
        <input type="text" id="postal" />
      </div>
      <button type="button" onClick={props.onCancel}>Cancel</button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
