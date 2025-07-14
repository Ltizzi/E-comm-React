import React, { useContext, useEffect, useState } from "react";
import BaseButton from "./common/BaseButton";
import { getFront, getTotal } from "../utils/utils";
import { AppContext } from "../context/AppContext";
import { BsCartDashFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const Cart = ({ goToProd }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState(false);
  const [toastType, setToastType] = useState("");
  const [justBought, setJustBought] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const { cart, removeProdFromCart, clearCart, removeOne, isMobile, setCart } =
    useContext(AppContext);

  const { updateProduct } = useContext(ProductContext);

  const navigate = useNavigate();

  const submitBuy = async () => {
    console.log("buying...");
    setIsWaiting(true);
    const allSuccess = [];
    const idErrors = [];
    cart.forEach(async (item) => {
      if (item.item.count >= item.count) {
        const newCount = item.item.count - item.count;
        item.item.count = newCount;

        const res = await updateProduct(item.item.id, item.item);
        if (res) {
          allSuccess.push(true);
        } else {
          allSuccess.push(false);
          idErrors.push(item.item.id);
          console.error(res);
        }
      }
    });

    if (allSuccess) {
      setIsWaiting(false);
      setShowToast(true);

      if (idErrors.length > 0) {
        setHasErrors(true);
        setToastType("error");
        setToastMsg(
          "Something went wrong with products " + JSON.stringify(idErrors)
        );
      } else {
        setToastType("success");
        setToastMsg("Transaction OK!");
        setJustBought(true);
      }
      setTimeout(() => {
        setShowToast(false);
        setToastMsg("");
        if (hasErrors) setHasErrors(false);
        clearCart();
      }, 5000);
    }
  };

  useEffect(() => {}, [setCart]);

  if (!Array.isArray(cart) || cart.length == 0) {
    setInterval(() => {
      setCountdown(countdown - 1);
    }, 1000);
    setTimeout(() => {
      setJustBought(false);
      navigate("/");
    }, 5000);
    return (
      <div className="flex justify-center items-center align-middle min-h-screen -mt-48">
        <div className="bg-red-400 rounded-lg py-5 px-7 text-center">
          <p className="text-white font-bold text-2xl">
            {justBought
              ? "Cart cleared (you just bought some albums! enjoy them!"
              : "Error: There is no products in the cart"}
          </p>
          <p className="text-white font-semibold text-lg mt-5">
            Redirecting in {countdown}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-10 gap-10  justify-center">
      <h1 className="text-center text-5xl font-extrabold">Cart</h1>
      <div className="flex lg:flex-row flex-col flex-wrap justify-start gap-5 mx-0 xl:mx-20 lg:mx-10 mt-5 items-start align-top">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 lg:w-2/3">
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
        <div
          className={`bg-base-100 ${
            !isMobile ? "h-80 w-80" : "w-99 ml-2"
          } rounded-xl py-7 px-7  flex flex-col gap-10 justify-between`}
        >
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
              btnLabel={""}
              tooltip={"Buy all items"}
              btnAction={async () => await submitBuy()}
            >
              {isWaiting ? (
                <>
                  <span className="loading loading-dots loading-xl"></span>
                </>
              ) : (
                "Buy"
              )}
            </BaseButton>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-bottom toast-center">
          <div
            className={`alert ${
              hasErrors ? "alert-error" : "alert-success"
            }  text-3xl`}
          >
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
