import React, { createContext, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  //CART
  function addProductToCart(prod, count) {
    console.log("Agregando a carrito..." + prod.title);

    const alreadyAdded =
      cart.filter((item) => item.item.id === prod.id).length > 0;
    if (alreadyAdded) {
      setCart((prevCart) =>
        prevCart.map((item) => {
          if (item.item.id === prod.id) {
            return { ...item, count: item.count + count };
          }
          return item;
        })
      );
    } else setCart((prevCart) => [...prevCart, { item: prod, count: count }]);
  }

  function clearCart() {
    setCart([]);
  }

  function removeProdFromCart(prod) {
    setCart(cart.filter((p) => p.item.id !== prod.id));
  }

  function removeOne(prod) {
    setCart((prevCart) => {
      const index = prevCart.findIndex((p) => p.item.id === prod.id);
      if (index === -1) return prevCart;

      const item = prevCart[index];

      if (item.count > 1) {
        const newItem = { ...item, count: item.count - 1 };
        return [
          ...prevCart.slice(0, index),
          newItem,
          ...prevCart.slice(index + 1),
        ];
      } else {
        return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
      }
    });
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        addProductToCart,
        clearCart,
        removeProdFromCart,
        removeOne,
        setIsMobile,
        isMobile,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
