import { useContext, useEffect, useState } from "react";
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
import { AppContext } from "./context/AppContext";

function App() {
  const [products, setProducts] = useState([]);
  // const [cart, setCart] = useState([]);
  const [productToShow, setProductToShow] = useState({});
  // const [isLogged, setIsLogged] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [otherAlbums, setOtherAlbums] = useState([]);

  const { isLogged, isAdmin } = useContext(AppContext);

  const navigate = useNavigate();

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
      <Nav />
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
                goToProd={goToProd}
                hasErrors={hasErrors}
              />
            }
          />
          <Route path="/cart" element={<Cart goToProd={goToProd} />} />
          <Route
            path="/product/:id"
            element={
              <ProductInfo
                prod={productToShow}
                otherAlbums={otherAlbums}
                goToProd={goToProd}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <UserProfile />
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
      <Footer />
    </>
  );
}

export default App;
