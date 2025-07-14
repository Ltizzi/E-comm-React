import React, { useContext } from "react";
import ThemeSelector from "./common/ThemeSelector";
import { Link } from "react-router-dom";
import { getFront, getTotal } from "../utils/utils";
import { AppContext } from "../context/AppContext";
import BaseButton from "./common/BaseButton";

import { FaShop } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext";

const Nav = (props) => {
  const { search } = props;
  const { cart, isMobile } = useContext(AppContext);
  const { logout, isLogged, isAdmin, user } = useContext(AuthContext);

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

  return (
    <div className="navbar bg-base-100  shadow-sm fixed top-0 z-30 max-w-screen">
      <div className="flex-1 hover:cursor-pointer">
        <Link to="/">
          <div
            className="tooltip tooltip-bottom tooltip-secondary"
            data-tip="Go back to main"
          >
            <p className={`btn btn-ghost ${isMobile ? "text-sm" : "text-lg"}`}>
              <FaShop />
              E-Commerce
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-row gap-2.5 lg:gap-5">
        <input
          type="text"
          placeholder="Search"
          className={`input input-bordered ${
            isMobile ? " w-32 input-sm " : "w-40"
          } input-primary md:w-auto`}
          onChange={(e) => search(e.target.value)}
        />
        <div>
          <ThemeSelector />
          {/* </div>
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
          )} */}
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 lg:h-7 lg:w-7"
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
              <span
                className={
                  "badge badge-xs lg:badge-md indicator-item badge-error text-white"
                }
              >
                {getTotalCartItems()}
              </span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100  mt-3 w-52 shadow"
          >
            <div className="card-body ">
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
                  <button className="btn btn-primary btn-block z-50">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          {isLogged && user ? (
            <div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-5 lg:w-10 rounded-full">
                  <img alt="" src={user.avatar} />
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
                <li className="hover:cursor-pointer">
                  <Link to="/signup">
                    <p>Register</p>
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
