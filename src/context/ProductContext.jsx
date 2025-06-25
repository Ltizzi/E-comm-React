import { React, createContext, useState } from "react";
import { AppContext } from "./AppContext";

export const ProductContext = createContext();

export const API_URL =
  "https://6812b2cd129f6313e20f4d3d.mockapi.io/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]); //TODO: RENAME AFTER REFACTOR

  const [focusProduct, setFocusProduct] = useState([]);

  function getAllProducts() {
    return fetch(API_URL, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching API DATA");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        return data;
      })
      .catch((err) => {
        console.error("ERROR: ", err);
      });
  }

  function getProductsWithPagination(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const end = skip + limit;
    return products.slice(skip, end);
  }

  function getProductById(id) {
    return fetch(`${API_URL}/${id}`, { method: "GET" })
      .then((res) => {
        if (!res.ok) throw new Error("Product not found!");
        return res.json();
      })
      .then((data) => {
        setFocusProduct(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function getOtherAlbumsByArtist(artist, title) {
    if (products)
      return products.filter(
        (prod) =>
          prod.artist.toLowerCase() === artist.toLowerCase() &&
          prod.title.toLowerCase() !== title.toLowerCase()
      );
    else {
      await getAllProducts();
      getOtherAlbumsByArtist(artist);
    }
  }

  function addNewProduct(prod, count) {}

  function updateProduct(id, prod, count) {}

  function deleteProduct(id) {}

  return (
    <ProductContext.Provider
      value={{
        products,
        addNewProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        getProductsWithPagination,
        getProductById,
        setProducts,
        setFocusProduct,
        focusProduct,
        getOtherAlbumsByArtist,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
