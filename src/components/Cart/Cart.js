import React, { useContext, useState } from "react";

import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const handleCartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const handleCartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const handleOrder = () => {
    setIsCheckOut(true);
  };

  const handleSubmittedOrder = async (userData) => {
     setIsSubmitting(true);
     await fetch(
      "https://food-order-app-react-a3ea3-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      });
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={handleCartItemRemove.bind(null, item.id)}
            onAdd={handleCartItemAdd.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={handleSubmittedOrder} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = (
    <p>Your tastebuds rock! Submitting order data...</p>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>
        Success! Order submitted! A meal fit for a king! Or a queen! Or court
        jester!
      </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
