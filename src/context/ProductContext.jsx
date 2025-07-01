import { React, createContext, useState } from "react";

export const ProductContext = createContext();

export const API_URL =
  "https://6812b2cd129f6313e20f4d3d.mockapi.io/api/products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

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
      await getOtherAlbumsByArtist(artist);
    }
  }

  function addNewProduct(prod) {
    return fetch(`${API_URL}`, {
      method: "POST",
      body: prod,
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "Something went wrong while adding new product to the database"
          );
        return res.json();
      })
      .then((data) => {
        console.log(data);
        getAllProducts();
        return "Product added!";
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  function updateProduct(id, prod) {
    return fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: prod,
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Something went wrong while updating product");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        getAllProducts();
        return "Product updated!";
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  function deleteProduct(id) {
    return fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "Something went wrong while deleting product from the database"
          );
        return res.json();
      })
      .then((data) => {
        console.log(data);
        getAllProducts();
        return "Product deleted!";
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }

  function searchProducts(searchInput) {
    console.log(searchInput);
    if (searchInput.length > 0)
      return products.filter(
        (prod) =>
          prod.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          prod.artist.toLowerCase().includes(searchInput.toLowerCase())
      );
    else return products;
  }

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
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
