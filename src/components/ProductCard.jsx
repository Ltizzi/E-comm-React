import React, { useContext, useEffect, useState } from "react";
import BaseButton from "./common/BaseButton";
import { getFront } from "../utils/utils";
import { AppContext } from "../context/AppContext";
import { FaInfoCircle, FaCartPlus } from "react-icons/fa";
import { BsCartDashFill } from "react-icons/bs";

const ProductCard = (props) => {
  const { prod, fromCart, goToProd } = props;
  const [isHover, setIsHover] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const { addProductToCart, removeProdFromCart } = useContext(AppContext);

  useEffect(() => {
    const img = new Image();
    img.src = getFront(prod.coverImages);
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(false);
  }, [prod]);

  return (
    <div
      className={`bg-neutral text-neutral-content w-72 h-72 flex flex-col  justify-center text-center rounded-lg shadow-lg shadow-secondary border-4 border-primary border-double border-spacing-36  ${
        loaded ? " bg-cover bg-center" : "skeleton"
      }`}
      style={{
        backgroundImage: loaded ? `url(${getFront(prod.coverImages)})` : "none",
      }}
    >
      <div
        className="w-full h-full  flex flex-col justify-center items-center text-center align-middle hover:bg-slate-950/70 transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onTouchStart={() => setIsHover(true)}
        onTouchCancelCapture={() => setIsHover(false)}
      >
        {isHover && (
          <div>
            <h3 className="text-2xl font-bold font-stretch-extra-condensed">
              {prod.title}
            </h3>
            <h4 className="text-xl font-semibold capitalize">{prod.artist}</h4>

            <div className="flex flex-row justify-around pt-4 gap-3 w-32 mx-auto">
              <BaseButton
                btnLabel={""}
                btnAction={() => goToProd(prod)}
                btnType={"success"}
                tooltip={"See more"}
              >
                <FaInfoCircle className="text-xl" />
              </BaseButton>{" "}
              {fromCart ? (
                <BaseButton
                  btnLabel={""}
                  btnAction={() => removeProdFromCart(prod)}
                  btnType={"error"}
                >
                  <BsCartDashFill className="text-xl" />
                </BaseButton>
              ) : (
                <BaseButton
                  btnLabel={""}
                  btnAction={() => addProductToCart(prod, 1)}
                  btnType={"accent"}
                  tooltip={"Add to cart"}
                >
                  <FaCartPlus className="text-xl" />
                </BaseButton>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
