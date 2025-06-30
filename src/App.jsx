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
import { ProductContext } from "./context/ProductContext";

function App() {
  const [products, setProducts] = useState([]);
  //const [productToShow, setProductToShow] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);

  const { isLogged, isAdmin } = useContext(AppContext);
  const { getAllProducts, setFocusProduct, searchProducts } =
    useContext(ProductContext);

  const navigate = useNavigate();

  //NAVIGATION

  function goToProd(prod) {
    //setProductToShow(prod);
    setFocusProduct(prod);
    navigate(`/product/${prod.id}`);
  }

  function search(input) {
    const data = searchProducts(input);
    setProducts(data);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();

        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setHasErrors(true);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Nav search={search} />
      {isLoading && <BaseLoading />}
      <div
        className="bg-gradient-to-br from-base-200 to-base-300 min-h-screen pt-10 w-full"
        style={{
          backgroundImage: `url(/img/bg2.png)`,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              !isLoading && (
                <ProductList
                  products={products}
                  goToProd={goToProd}
                  hasErrors={hasErrors}
                />
              )
            }
          />
          <Route path="/cart" element={<Cart goToProd={goToProd} />} />
          <Route
            path="/product/:id"
            element={
              <ProductInfo
                // prod={productToShow}
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
