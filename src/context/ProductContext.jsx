import { React, createContext, useState } from "react";
import { AppContext } from "./AppContext";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  function getProducts(page, limit) {}

  function getProductById(id) {}

  function addNewProduct(prod, count) {}

  function updateProduct(id, prod) {}

  function deleteProduct(id) {}

  return (
    <AppContext.Provider
      value={
        (products,
        addNewProduct,
        updateProduct,
        deleteProduct,
        getProducts,
        getProductById,
        setProducts)
      }
    >
      {children}
    </AppContext.Provider>
  );
}
