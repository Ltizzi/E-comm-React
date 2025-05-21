import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./components/Cart";
import ProductInfo from "./components/ProductInfo";
import NotFound from "./pages/NotFound";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productToShow, setProductToShow] = useState({});

  const navigate = useNavigate();

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
                removeOne={removeOne}
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
