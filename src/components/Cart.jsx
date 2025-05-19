import React from "react";
import BaseButton from "./common/BaseButton";
import ProductCard from "./ProductCard";

const Cart = (props) => {
  const { cart, removeProdFromCart, clearCart, goToProd } = props;
  if (!Array.isArray(cart) || cart.length == 0) {
    return (
      <div className="flex justify-center items-center align-middle min-h-screen -mt-48">
        <div className="bg-red-400 rounded-lg py-5 px-7 text-center">
          <p className="text-white font-light text-2xl">
            Error: There is no products in the cart
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col py-10 gap-10 justify-center items-center align-middle ">
      <BaseButton
        btnLabel={"Clear Cart"}
        btnAction={() => clearCart()}
        btnType={"error"}
      />
      <div className="flex flex-row flex-wrap justify-start gap-5 mx-20">
        {cart.map((prod, index) => (
          <ProductCard
            key={index}
            prod={prod}
            removeProdFromCart={removeProdFromCart}
            fromCart={true}
            goToProd={goToProd}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
