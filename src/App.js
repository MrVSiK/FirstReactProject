import Header from "./components/layout/Header"
import React from "react"
import Meals from "./components/meals/Meals"
import Cart from "./components/cart/Cart"
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = React.useState(false);

  const showCartHandler = props =>{
    setCartIsShown(true);
  }

  const hideCartHandler = props =>{
    setCartIsShown(false);
  }

  return (
    <CartProvider>
    {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart = {showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
