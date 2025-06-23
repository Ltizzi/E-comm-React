import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <ProductProvider>
        <Router>
          <App />
        </Router>
      </ProductProvider>
    </AppProvider>
  </StrictMode>
);
