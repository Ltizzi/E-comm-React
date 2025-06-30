import React, { createContext, useState } from "react";

export const AppContext = createContext();

//TODO: pasar todo el manejo de state al Context.

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);

  const [isLogged, setIsLogged] = useState(() => {
    const loggedData = localStorage.getItem("logged");
    return !!loggedData;
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  //AUTH
  function login(obj) {
    localStorage.setItem("logged", JSON.stringify(obj));
    setIsLogged(true);
    console.log(isLogged);
  }

  function logout() {
    localStorage.removeItem("logged");
    setIsLogged(false);
  }

  function setAdmin() {
    setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  }

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
        isLogged,
        isAdmin,
        login,
        logout,
        setAdmin,
        setIsMobile,
        isMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
