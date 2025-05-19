import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./components/Cart";
import ProductInfo from "./components/ProductInfo";
import NotFound from "./components/NotFound";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productToShow, setProductToShow] = useState({});

  const navigate = useNavigate();

  function addProductToCart(prod) {
    console.log("Agregando a carrito..." + prod.title);

    setCart((prevCart) => [...prevCart, prod]);
  }

  function clearCart() {
    setCart([]);
  }

  function removeProdFromCart(prod) {
    let found = false;
    setCart(
      cart.filter((p) => {
        if (!found && p.id === prod.id) {
          found = true;
          return false;
        }
        return true;
      })
    );
  }

  function goToProd(prod) {
    setProductToShow(prod);
    navigate(`/product/${prod.id}`);
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
      <Nav cart={cart} />

      <div
        className="bg-gradient-to-br from-base-200 to-base-300 min-h-screen pt-10"
        style={{
          backgroundImage: `url(/img/bg2.png)`,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                products={products}
                addProductToCart={addProductToCart}
                goToProd={goToProd}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeProdFromCart={removeProdFromCart}
                clearCart={clearCart}
                goToProd={goToProd}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductInfo
                prod={productToShow}
                addProductToCart={addProductToCart}
                removeProdFromCart={removeProdFromCart}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
