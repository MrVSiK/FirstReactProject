import Classes from "./MealItemForm.module.css";
import Input from "../../UI/Input"
import React from "react"

const MealItemForm = props =>{
    const [isValid, setValid] = React.useState(true);
    const amountInputRef = React.useRef();

    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredNumber < 1 || enteredNumber > 5){
            setValid(false);
            return;
        }

        props.onAddToCart(enteredNumber);
    }


    return <form className={Classes.form} onSubmit={submitHandler}>
        <Input ref={amountInputRef} label="Amount" input={{id : "amount_" + props.id, type: "number", min: "1", max: "5", step: "1", defaultValue : "1"}} />
        <button>+ Add</button>
        {!isValid && <p>Please enter a valid Amount(1-5)</p>}
    </form>
};


export default MealItemForm