import React, { useContext } from "react";
import BaseButton from "./common/BaseButton";
import ProductCard from "./ProductCard";
import { getFront, getTotal } from "../utils/utils";
import { AppContext } from "../context/AppContext";
import { BsCartDashFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const { goToProd } = props;

  const { cart, removeProdFromCart, clearCart, removeOne, isMobile } =
    useContext(AppContext);

  const navigate = useNavigate();

  if (!Array.isArray(cart) || cart.length == 0) {
    setTimeout(() => navigate("/"), 2000);
    return (
      <div className="flex justify-center items-center align-middle min-h-screen -mt-48">
        <div className="bg-red-400 rounded-lg py-5 px-7 text-center">
          <p className="text-white font-light text-2xl">
            Error: There is no products in the cart
          </p>
          <p className="text-white font-extralight text-lg mt-5">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col py-10 gap-10  justify-center">
      <h1 className="text-center text-5xl font-extrabold">Cart</h1>
      <div className="flex 2xl:flex-row flex-col flex-wrap justify-start gap-5 mx-8 lg:mx-20 mt-5 items-start align-top">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 2xl:w-2/3">
          <table className="table z-0">
            {/* head */}
            <thead>
              <tr>
                <th>Cover</th>
                {!isMobile && <th>Album</th>}
                {!isMobile && <th>Artist</th>}

                <th>Price</th>

                <th>Quantity</th>
                <th>Control</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, index) => (
                <tr key={index}>
                  <th>
                    <img
                      src={getFront(cartItem.item.coverImages)}
                      className="w-12 h-12 hover:cursor-pointer"
                      alt=""
                      onClick={() => goToProd(cartItem.item)}
                    />
                  </th>
                  {!isMobile && <td>{cartItem.item.title}</td>}
                  {!isMobile && <td>{cartItem.item.artist}</td>}

                  <td>u$s{cartItem.item.price}</td>
                  <td>{cartItem.count}</td>
                  <td className="flex flex-row gap-1">
                    <BaseButton
                      btnLabel={""}
                      btnType={"warning"}
                      btnAction={() => removeOne(cartItem.item)}
                      tooltip={"Remove one"}
                    >
                      <BsCartDashFill className="text-xl" />
                    </BaseButton>
                    <BaseButton
                      btnLabel={""}
                      btnType={"error"}
                      btnAction={() => removeProdFromCart(cartItem.item)}
                      tooltip={"Remove all"}
                    >
                      <FaTrashAlt className="text-xl" />
                    </BaseButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-base-100 h-80 w-80 rounded-xl py-7 px-7  flex flex-col gap-10 justify-between">
          <h1 className="text-3xl">
            Total: <span className="italic">u$s {getTotal(cart)}</span>{" "}
          </h1>
          <div className="flex flex-row justify-between gap-5">
            <BaseButton
              btnLabel={"Clear Cart"}
              btnAction={() => clearCart()}
              btnType={"error"}
              tooltip={"Clear all items from cart"}
            >
              <FaTrashAlt className="text-2xl" />
            </BaseButton>
            <BaseButton
              btnType="info"
              btnLabel={"Buy"}
              tooltip={"Buy all items"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
