import { React, createContext, useState } from "react";
import { AppContext } from "./AppContext";

export const ProductContext = createContext();

export const API_URL =
  "https://6812b2cd129f6313e20f4d3d.mockapi.io/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]); //TODO: RENAME AFTER REFACTOR

  function getAllProducts() {
    return fetch(API_URL, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching API DATA");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
        return data;
      })
      .catch((err) => {
        console.error("ERROR: ", err);
      });
  }

  function getProducts(page, limit) {}

  function getProductById(id) {}

  function addNewProduct(prod, count) {}

  function updateProduct(id, prod) {}

  function deleteProduct(id) {}

  return (
    <ProductContext.Provider
      value={{
        products,
        addNewProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        getProducts,
        getProductById,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
