import CartContext from "./Cart-context"
import React from "react"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state,action) =>{
    if(action.type === "ADD"){

        const existingItemIndex = state.items.findIndex((item) => {
            return item.id === action.item.id
        })
        const existingCartItem = state.items[existingItemIndex];
        let updatedItem;
        let updatedItems;
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItem = {...action.item}
            updatedItems = state.items.concat(updatedItem)
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else if(action.type === "REMOVE"){
        const existingItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingItem = state.items[existingItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount -1};
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}


const CartProvider = props =>{

    const [cartState, dispatchCartAction] = React.useReducer(cartReducer, defaultCartState);

    const addItemHandler = item =>{
        dispatchCartAction({
            type: "ADD",
            item: item
        })
    }

    const removeItemHandler = id =>{
        dispatchCartAction({
            type: "REMOVE",
            id: id
        })
    }


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};


export default CartProvider