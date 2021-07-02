import React from "react"
import CartContext from "../../../store/Cart-context"
import Classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"
const MealItem = props =>{
    const cartCtx = React.useContext(CartContext);

    const addToCartHandler = (amount) =>{
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }

    const price = `$${props.price.toFixed(2)}`
    return <li className={Classes.meal}>
        <div>
        <h3>{props.name}</h3>
        <div className={Classes.description}>{props.description}</div>
        <div className={Classes.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
    </li>
};


export default MealItem;