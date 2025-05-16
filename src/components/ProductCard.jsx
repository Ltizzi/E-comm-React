import React from "react";

const ProductCard = (props) => {
  const { prod } = props;

  function getFront(imgs) {
    if (imgs) {
      console.log(
        imgs.find((img) => img.url && img.types.find((t) => t === "Front"))
      );
      return (
        imgs.find((img) => img.url && img.types.find((t) => t === "Front")) ||
        null
      );
    } else return null;
  }

  function checkIsFront() {
    return getFront(prod.coverImages) != null;
  }

  <div className="skeleton h-32 w-32"></div>;
  return (
    <div className="bg-base-300 w-64 h-96 flex flex-col  justify-center text-center rounded-lg shadow-lg shadow-base-content">
      {checkIsFront() ? (
        <img
          src={getFront(prod.coverImages).url} //prod.coverImages[0].url
          className="w-56 object-center rounded-lg mx-auto"
          alt=""
        />
      ) : (
        <div className="skeleton h-52 w-56"></div>
      )}

      <h3 className="text-xl font-bold font-stretch-50%">{prod.title}</h3>
      <h4 className="text-lg font-semibold capitalize">{prod.artist}</h4>
      <p className="text-sm">{prod.releaseDate}</p>
    </div>
  );
};

export default ProductCard;
