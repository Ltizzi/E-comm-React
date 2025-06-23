import { React, createContext, useState } from "react";
import { AppContext } from "./AppContext";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [albums, setAlbums] = useState([]); //TODO: RENAME AFTER REFACTOR

  function getProducts(page, limit) {}

  function getProductById(id) {}

  function addNewProduct(prod, count) {}

  function updateProduct(id, prod) {}

  function deleteProduct(id) {}

  return (
    <ProductContext.Provider
      value={
        (albums,
        addNewProduct,
        updateProduct,
        deleteProduct,
        getProducts,
        getProductById,
        setAlbums)
      }
    >
      {children}
    </ProductContext.Provider>
  );
}
