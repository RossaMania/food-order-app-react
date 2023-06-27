import React, { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";

import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState();

  const amountInputRef = useRef();

  const handleSubmit = (event) => {
    event.prevent.default();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 12
    ) {
      setAmountIsValid(false)
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "12",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-12)!</p>}
    </form>
  );
};

export default MealItemForm;
