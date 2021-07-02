import Classes from "./Cart.module.css"
import Modal from "../UI/Modal"
import React from "react"
import CartContext from "../../store/Cart-context"
import CartItem from "./CartItem"

const Cart = props =>{
    const cartCtx = React.useContext(CartContext)
    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = item =>{
        cartCtx.addItem({...item, amount: 1})
    }
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;

    const cartItems = <ul className={Classes['cart-items']}>{cartCtx.items.map((item)=> <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}>{item.name}</CartItem>)}</ul>
    return <Modal onClose={props.onClose}>
        {cartItems}
        <div className={Classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={Classes.actions}>
            <button className={Classes['button--alt']} onClick={props.onClose} >Close</button>
            {hasItems && <button className={Classes.button} >Order</button>}
        </div>
    </Modal>
};


export default Cart;