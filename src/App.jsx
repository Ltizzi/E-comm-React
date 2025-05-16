import { useEffect, useState } from "react";
import "./App.css";
import BaseButton from "./components/common/BaseButton";
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //return await fetch("/data/albums.json");
    fetch("/data/albums.json")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar el archivo");
        return res.json();
      })
      .then((data) => {
        console.log("Contenido del JSON:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <>
      <div className="bg-gradient-to-br from-base-100 to-base-300 min-h-screen">
        <Nav />
        <BaseButton
          btnLabel={"test"}
          btnType={"primary"}
          btnAction={() => null}
        />
        <ProductList products={products} />
        {/* {products ? (
          products.map((prod) => (
            <p className="flex flex-row justify-start gap-3">
              <span>{prod.artist}</span>
              <span>{prod.title}</span>
            </p>
          ))
        ) : (
          <p>Error</p>
        )} */}
      </div>
    </>
  );
}

export default App;
