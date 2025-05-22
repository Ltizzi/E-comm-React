import { useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./components/Cart";
import ProductInfo from "./components/ProductInfo";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import BaseLoading from "./components/common/BaseLoading";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [productToShow, setProductToShow] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [otherAlbums, setOtherAlbums] = useState([]);

  const navigate = useNavigate();

  //AUTH

  function login(obj) {
    localStorage.setItem("logged", JSON.stringify(obj));
    setIsLogged(true);
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

  //NAVIGATION

  function goToProd(prod) {
    getOtherAlbumsByArtist(prod.artist);
    setProductToShow(prod);

    navigate(`/product/${prod.id}`);
  }

  function getOtherAlbumsByArtist(artist) {
    const albums = products.filter(
      (album) => album.artist.toLowerCase() === artist.toLowerCase()
    );
    console.log("***");
    console.log(albums);
    setOtherAlbums(albums);
  }

  useEffect(() => {
    fetch("/data/albums.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el archivo");
        return res.json();
      })
      .then((data) => {
        console.log("Contenido del JSON:", data);
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setHasErrors(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Nav cart={cart} logout={logout} isLogged={isLogged} isAdmin={isAdmin} />
      {isLoading && <BaseLoading />}
      <div
        className="bg-gradient-to-br from-base-200 to-base-300 min-h-screen pt-10 "
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
                hasErrors={hasErrors}
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
                otherAlbums={otherAlbums}
                addProductToCart={addProductToCart}
                removeProdFromCart={removeProdFromCart}
                goToProd={goToProd}
              />
            }
          />
          <Route path="/login" element={<Login login={login} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <UserProfile isAdmin={isAdmin} setAdmin={setAdmin} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthenticated={isLogged && isAdmin}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer isAdmin={isAdmin} isLogged={isLogged} />
    </>
  );
}

export default App;
