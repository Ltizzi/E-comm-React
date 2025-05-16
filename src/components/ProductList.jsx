import React from "react";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
  const { products } = props;
  return (
    <div className="flex flex-row gap-5 justify-start mx-32 flex-wrap">
      {products ? (
        products.map((p, index) => <ProductCard prod={p} key={index} />)
      ) : (
        <p>ERROR!</p>
      )}
    </div>
  );
};

export default ProductList;
