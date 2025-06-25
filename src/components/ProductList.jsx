import React from "react";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
  const { products, goToProd, hasErrors } = props;

  if (!Array.isArray(products) && hasErrors) {
    console.error("no products in products");
    return (
      <div className="flex flex-col justify-center items-center align-middle ">
        <div className="bg-red-400 rounded-lg py-5 px-3 text-center">
          <p className="text-red-950">
            Error: There is no products avaible to show
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-5 2xl:gap-y-5 gap-y-10 justify-start items-center 2xl:mx-38 mx-20 align-middle w-fit flex-wrap py-12">
      {products.map((p) => (
        <ProductCard
          prod={p}
          key={p.id}
          // addProductToCart={addProductToCart}
          goToProd={goToProd}
          fromCart={false}
        />
      ))}
    </div>
  );
};

export default ProductList;
