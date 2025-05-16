import React, { useState } from "react";
import BaseButton from "./common/BaseButton";

const ProductCard = (props) => {
  const { prod, addProductToCart } = props;
  const [isHover, setIsHover] = useState(false);

  function getFront(imgs) {
    if (imgs) {
      const img = imgs.find(
        (img) => img.url && img.types.find((t) => t === "Front")
      );
      return img ? img.url : null;
    } else return null;
  }

  // function checkIsFront() {
  //   return getFront(prod.coverImages) != null;
  // }

  return (
    <div
      className="bg-neutral text-neutral-content w-72 h-72 flex flex-col  justify-center text-center rounded-lg shadow-lg shadow-secondary border-4 border-primary border-double border-spacing-36 bg-cover bg-center"
      style={{
        backgroundImage: `url(${getFront(prod.coverImages)})`,
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
                btnAction={() => null}
                btnType={"success"}
              />
              <BaseButton
                btnLabel={"Add to cart"}
                btnAction={() => addProductToCart(prod)}
                btnType={"accent"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
