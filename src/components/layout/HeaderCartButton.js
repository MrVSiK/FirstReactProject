import CartIcon from "../cart/CartIcon"
import Classes from "./HeaderCartButton.module.css"
import React from "react"
import CartContext from "../../store/Cart-context"

const HeaderCartButton = props =>{
    const cartctx = React.useContext(CartContext);
    const {items} = cartctx;
    const [buttonIsHighlighted, setButtonisHighlighted] = React.useState(false);
    const numberOfCartItems = items.reduce((curNumber,item)=>{
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${Classes.button} ${buttonIsHighlighted ? Classes.bump : ""}`

    React.useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setButtonisHighlighted(true);

        const timer = setTimeout(()=>{
            setButtonisHighlighted(false);
        }, 300)

        return () =>{
            clearTimeout(timer);
        }

    }, [items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={Classes.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={Classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
};

export default HeaderCartButton;