import React from 'react'
import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action)=>{
  if (action.type === 'ADD'){
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartState;
}

// Context provider method + initialised object values
const CartProvider = (props) => {
  const[cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
// Add to cart handler function
    const addToCart =(item)=>{
      dispatchCartAction({type: 'ADD', item: item});
    };
// Remove from cart handler method
    const removeFromCart =(id)=>{
      dispatchCartAction({type: 'REMOVE', id: id});
    };

    const cartContext= {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCart,
        removeItem: removeFromCart,
    }

  return (
// Wrap all components reguiring the context from App.js
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;