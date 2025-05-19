import React, { useEffect, useState } from "react";
import { getAlbumById, getFront } from "../utils/utils";
import { useParams } from "react-router-dom";
import BaseButton from "./common/BaseButton";

const ProductInfo = (props) => {
  const { prod, addProductToCart, removeProdFromCart } = props;
  const [productToShow, setProductToShow] = useState({});
  const [loaded, setLoaded] = useState();
  const [pictureToShow, setPictureToShow] = useState();
  const [total, setTotal] = useState(1);

  const { id } = useParams();

  function getTrackDuration(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
  }

  function addToCart() {
    for (let i = 0; i < total; i++) {
      addProductToCart(productToShow);
    }
  }

  function handleChange(e) {
    console.log(e.target.value);
    setTotal(Number(e.target.value));
  }

  useEffect(() => {
    const loadProduct = async () => {
      if (prod) {
        setProductToShow(prod);
        setLoaded(true);
      } else {
        const album = await getAlbumById(id);
        if (album) {
          setProductToShow(album);
          setLoaded(true);
        } else {
          setLoaded(false);
        }
      }
    };
    loadProduct();
    const frontImg = getFront(productToShow.coverImages);
    setPictureToShow(frontImg);
  }, [prod, id, productToShow]);

  return (
    <div className="pt-12 flex flex-col justify-center h-screen items-center">
      {loaded && productToShow ? (
        <div className="flex flex-row justify-between bg-gradient-to-r from-base-100/70 to-base-300/95 px-10 py-5 w-11/12 rounded-2xl">
          <div className="flex flex-col justify-center items-center gap-2 w-2/5">
            <img
              src={pictureToShow}
              alt=""
              className="w-4/5 max-h-120 min-h-120 object-contain"
            />
            <div className="flex flex-row overflow-hidden overflow-x-scroll justify-start gap-2 mt-2  ">
              {productToShow.coverImages.map((img) => (
                <img
                  src={img.url}
                  className="w-28 h-28 hover:cursor-pointer"
                  onClick={() => setPictureToShow(img.url)}
                />
              ))}
            </div>
          </div>
          <div className="w-2/5 flex flex-col justify-start gap-3 bg-neutral/90 text-neutral-content py-2 px-10 rounded-lg">
            <h1 className="text-4xl">{productToShow.title}</h1>
            <h2 className="text-2xl">{productToShow.artist}</h2>
            <h3 className="italic text-lg">{productToShow.releaseDate}</h3>
            <div className="flex flex-col justify-start gap-2">
              {productToShow.tracklist.map((t, index) => (
                <p className="text-sm">
                  {index + 1}. {t} -{" "}
                  {getTrackDuration(productToShow.extra.trackDuration[index])}
                </p>
              ))}
            </div>
            {productToShow.extra.producer && (
              <p className="text-lg">
                Producer: {productToShow.extra.producer}
              </p>
            )}
            {productToShow.extra.format && (
              <p className="text-lg">Format: {productToShow.extra.format}</p>
            )}
            {productToShow.extra.duration && (
              <p className="text-lg">
                Duration: <br />{" "}
                {getTrackDuration(productToShow.extra.duration)}
              </p>
            )}
            <div className="bg-success text-success-content py-1 px-2 rounded-2xl w-28 text-center font-mono font-semibold">
              <p>u$s {productToShow.price}</p>
            </div>
            <div className="flex flex-row justify-start">
              <div className="flex flex-col justify-start">
                <input
                  type="number"
                  className="input validator input-primary input-md w-20 text-base-content bg-base-300"
                  required
                  placeholder="1"
                  min="1"
                  max="10"
                  title="Must be greater than 1"
                  value={total}
                  onChange={handleChange}
                />
                <p className="validator-hint">Must be greater than 1</p>
              </div>
              <BaseButton
                btnLabel={"Add to  Cart"}
                btnAction={addToCart}
                btnType={"accent"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center flex flex-col justify-center items-center align-middle h-screen">
          Somewthing went wrong...
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
