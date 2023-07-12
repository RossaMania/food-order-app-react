import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveNumbers = (value) => value.trim().length === 5;

const Checkout = (props) => {

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const zipCodeInputRef = useRef();

  const handleOrderConfirmation = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredZIPcode = zipCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredZIPIsValid = isFiveNumbers(enteredZIPcode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredAddressIsValid,
      city: enteredCityIsValid,
      postalCode: enteredZIPIsValid
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredZIPIsValid;

      if (!formIsValid) {
        return;
      }

      // Submit cart data

  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`
  const addressControlClasses = `${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`
  const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? "" : classes.invalid}`

  return (
    <form onSubmit={handleOrderConfirmation}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="street">Street Address</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid address!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">ZIP Code</label>
        <input type="text" id="postal" ref={zipCodeInputRef} />
        {!formInputsValidity.postalCode && <p>Please enter a valid ZIP code!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
