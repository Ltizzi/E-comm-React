import { useContext, useEffect, useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cart from "./components/Cart";
import ProductInfo from "./components/ProductInfo";
import NotFound from "./pages/NotFound";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import BaseLoading from "./components/common/BaseLoading";
import AdminPanel from "./components/admin/AdminPanel";
import { AppContext } from "./context/AppContext";
import { ProductContext } from "./context/ProductContext";
import { AuthContext } from "./context/AuthContext";

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);

  const { isLogged, isAdmin, logLocalUser, logout } = useContext(AuthContext);
  const { setIsMobile } = useContext(AppContext);
  const { getAllProducts, setFocusProduct, searchProducts } =
    useContext(ProductContext);

  const navigate = useNavigate();

  //NAVIGATION

  const fetchData = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setHasErrors(true);
      setIsLoading(false);
    }
  };

  function goToProd(prod) {
    setFocusProduct(prod);
    navigate(`/product/${prod.id}`);
  }

  function search(input) {
    const data = searchProducts(input);
    setProducts(data);
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

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

    function getIsLogged() {
      const isLoggedLocal = JSON.parse(localStorage.getItem("logged"));
      if (isLoggedLocal) {
        logLocalUser(isLoggedLocal);
      } else logout();
    }

    window.addEventListener("resize", handleResize);
    getIsLogged();
    fetchData();

    return () => window.removeEventListener("resize", handleResize);
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
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <Cart goToProd={goToProd} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductInfo goToProd={goToProd} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
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
                <AdminPanel goToProd={goToProd} fetchData={fetchData} />
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
