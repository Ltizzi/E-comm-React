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
  const [user, setUser] = useState();

  //AUTH

  async function getUsers() {
    return await fetch("/data/users.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el archivo");
        return res.json();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
  async function login(obj) {
    const users = await getUsers();

    const filteredUser = users.filter(
      (user) => user.email.toLowerCase() === obj.email.toLowerCase()
    );

    if (!filteredUser || filteredUser.length < 1) {
      return "Invalid e-mail";
    } else {
      if (filteredUser[0].password !== obj.password) {
        return "Wrong password";
      } else {
        const user = filteredUser[0];
        user.password = "********";
        localStorage.setItem("logged", JSON.stringify(user));
        localStorage.setItem("isAdmin", JSON.stringify(user.isAdmin));
        setUser(user);
        setIsLogged(true);
        setIsAdmin(user.isAdmin);

        return "logged";
      }
    }
  }

  function logLocalUser(obj) {
    setUser(obj);
    setIsLogged(true);
    setIsAdmin(obj.isAdmin);
  }

  function logout() {
    localStorage.removeItem("logged");
    localStorage.removeItem("isAdmin");
    setIsLogged(false);
  }

  function setAdmin() {
    setIsAdmin((prevIsAdmin) => !prevIsAdmin);
  }

  function checkIsAdmin() {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    return isAdmin;
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
        checkIsAdmin,
        setIsMobile,
        isMobile,
        user,
        logLocalUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
