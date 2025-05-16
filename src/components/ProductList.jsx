import React from "react";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
  const { products } = props;
  return (
    <div className="flex flex-row gap-5 2xl:gap-y-5 gap-y-10 justify-start items-center 2xl:mx-9 mx-20 align-middle w-full flex-wrap py-12">
      {products ? (
        products.map((p) => <ProductCard prod={p} key={p.id} />)
      ) : (
        <p>ERROR!</p>
      )}
    </div>
  );
};

export default ProductList;
