import { useEffect, useState } from "react";
import "./App.css";
import BaseButton from "./components/common/BaseButton";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  function addProductToCart(prod) {
    console.log("Agregando a carrito..." + prod.title);

    setCart([...cart, prod]);
  }

  function clearCart() {
    setCart([]);
  }

  function removeProdFromCart(prod) {
    let found = false;
    setCart(
      cart.filter((p) => {
        if (!found && p.id == prod.id) {
          found = true;
          return false;
        }
        return true;
      })
    );
  }

  useEffect(() => {
    //return await fetch("/data/albums.json");
    fetch("/data/albums.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el archivo");
        return res.json();
      })
      .then((data) => {
        console.log("Contenido del JSON:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-base-200 to-base-300 min-h-screen">
        <Nav cart={cart} />
        <BaseButton
          btnLabel={"test"}
          btnType={"primary"}
          btnAction={() => null}
        />
        <ProductList products={products} addProductToCart={addProductToCart} />
        <Footer />
      </div>
    </>
  );
}

export default App;
