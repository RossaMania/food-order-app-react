import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
items: 0,
totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {

    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  } else if (action.type === "REMOVE") {

  }
return defaultCartState;
};

const CartProvider = (props) => {

  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const handleAddItemToCart = (item) => {
    dispatchCartAction({type: "ADD", item: item})
  }

  const handleRemoveItemFromCart = (id) => {
    dispatchCartAction({type: "REMOVE", id: id})

  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart
  }

return <CartContext.Provider value={cartContext}>
  {props.children}
</CartContext.Provider>
}

export default CartProvider