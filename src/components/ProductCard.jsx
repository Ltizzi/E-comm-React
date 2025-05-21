import React, { useEffect, useState } from "react";
import BaseButton from "./common/BaseButton";
import { getFront } from "../utils/utils";

const ProductCard = (props) => {
  const { prod, addProductToCart, fromCart, removeProdFromCart, goToProd } =
    props;
  const [isHover, setIsHover] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      {/* {checkIsFront() ? (
        <img
          src={getFront(prod.coverImages).url} //prod.coverImages[0].url
          className="w-44 h-44 object-center rounded-lg mx-auto"
          alt=""
        />
      ) : (
        <div className="skeleton h-52 w-56"></div>
      )} */}

      <div
        className="w-full h-full  flex flex-col justify-center items-center text-center align-middle hover:bg-slate-950/70 transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <div>
            <h3 className="text-2xl font-bold font-stretch-extra-condensed">
              {prod.title}
            </h3>
            <h4 className="text-xl font-semibold capitalize">{prod.artist}</h4>

            <div className="flex flex-row justify-around pt-4 gap-3">
              <BaseButton
                btnLabel={"See more"}
                btnAction={() => goToProd(prod)}
                btnType={"success"}
              />
              {fromCart ? (
                <BaseButton
                  btnLabel={"Remove"}
                  btnAction={() => removeProdFromCart(prod)}
                  btnType={"error"}
                />
              ) : (
                <BaseButton
                  btnLabel={"Add to cart"}
                  btnAction={() => addProductToCart(prod, 1)}
                  btnType={"accent"}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
