import React, { useContext, useState } from "react";
import ThemeSelector from "./common/ThemeSelector";
import { Link } from "react-router-dom";
import { getFront, getTotal } from "../utils/utils";
import { AppContext } from "../context/AppContext";
import BaseButton from "./common/BaseButton";
import { ProductContext } from "../context/ProductContext";

const Nav = (props) => {
  const { products } = props;

  const { cart, logout, isLogged, isAdmin } = useContext(AppContext);

  const [count, setCount] = useState(0);
  const [errorAlbums, setErrorAlbums] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function getCartCoverImages() {
    return cart.map((item) => getFront(item.item.coverImages));
  }

  function getTotalCartItems() {
    let sol = 0;
    for (let i = 0; i < cart.length; i++) {
      sol += cart[i].count;
    }
    return sol;
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function postProducts() {
    setShowModal(true);
    const failed = [];
    let albums = errorAlbums.length > 0 ? errorAlbums : products;

    for (const album of albums) {
      try {
        console.log("ALBUM: " + album);

        const res = await fetch(
          "https://6812b2cd129f6313e20f4d3d.mockapi.io/api/products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(album),
          }
        );
        if (!res.ok) throw new Error("Error al subir " + album.title);
        await res.json();
        setCount(count + 1);
      } catch (err) {
        console.error("ERROR: ", err);
        failed.push(album);
      }
      await delay(400);
    }
    setErrorAlbums(failed);
    setShowModal(false);
  }

  return (
    <div className="navbar bg-base-100  shadow-sm fixed top-0">
      <div className="flex-1 hover:cursor-pointer">
        <Link to="/">
          <p className="btn btn-ghost text-xl">E-Commerce</p>
        </Link>
      </div>

      <div className="flex flex-row gap-5">
        <div>
          <ThemeSelector />
        </div>
        <div>
          <BaseButton
            btnLabel={"UPLOAD"}
            btnAction={postProducts}
            btnType={"success"}
          />
          {showModal && (
            <div className="w-screen h-screen bg-black/50 absolute top-0 left-0">
              <div className="bg-white rounded-2xl py-5 px-5 absolute top-1/2 left-1/2 text-black">
                <p>
                  Count: {count} / {products.length}
                </p>
                <p>Errors: {errorAlbums.length}</p>
              </div>
            </div>
          )}
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />{" "}
              </svg>
              <span className={"badge badge-md indicator-item badge-error"}>
                {getTotalCartItems()}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">
                {getTotalCartItems()} Items
              </span>
              <div className="flex flex-row flex-wrap gap-2 bg-neutral/40 p-2 rounded-lg justify-start items-center mx-2z">
                {getCartCoverImages().map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    className="w-10 h-10 rounded-md"
                    alt=""
                  />
                ))}
              </div>
              <span className="text-info">Subtotal: u$s{getTotal(cart)}</span>

              <div className="card-actions">
                <Link to="/cart">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          {isLogged ? (
            <div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt=""
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="hover:cursor-pointer">
                  <Link to="/profile">
                    <p className="justify-between">Profile</p>
                  </Link>
                </li>
                {isAdmin && (
                  <li className="hover:cursor-pointer">
                    <Link to="/admin">
                      <p>Admin Panel</p>
                    </Link>
                  </li>
                )}

                <li className="hover:cursor-pointer" onClick={logout}>
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="" src="/img/avatar.png" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="hover:cursor-pointer">
                  <Link to="/login">
                    <p>Login</p>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
