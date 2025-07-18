import React, { useContext, useEffect, useState } from "react";
import { getFront } from "../utils/utils";
import { useParams } from "react-router-dom";
import BaseButton from "./common/BaseButton";
import { AppContext } from "../context/AppContext";
import { ProductContext } from "../context/ProductContext";
import { FaCartPlus } from "react-icons/fa";

const ProductInfo = (props) => {
  const { goToProd } = props;

  const { addProductToCart } = useContext(AppContext);
  const {
    getProductById,
    getOtherAlbumsByArtist,
    focusProduct,
    setFocusProduct,
  } = useContext(ProductContext);

  const [productToShow, setProductToShow] = useState({});
  const [loaded, setLoaded] = useState();
  const [pictureToShow, setPictureToShow] = useState();
  const [total, setTotal] = useState(1);

  const [otherAlbums, setOtherAlbums] = useState([]);

  const { id } = useParams();

  function getTrackDuration(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  function addToCart() {
    addProductToCart(productToShow, total);
  }

  function handleChange(e) {
    console.log(e.target.value);
    setTotal(Number(e.target.value));
  }

  useEffect(() => {
    const loadProduct = async () => {
      if (focusProduct && focusProduct.id) {
        setProductToShow(focusProduct);
        setLoaded(true);
      } else {
        const album = await getProductById(id);

        if (album) {
          setFocusProduct(album);
          setProductToShow(album);
          setLoaded(true);
        } else {
          setLoaded(false);
        }
      }
      const albums = await getOtherAlbumsByArtist(
        productToShow.artist,
        productToShow.title
      );
      setOtherAlbums(albums);
    };
    loadProduct();
    const frontImg = getFront(productToShow.coverImages);
    setPictureToShow(frontImg);
  }, [
    focusProduct,
    id,
    productToShow,
    getOtherAlbumsByArtist,
    getProductById,
    setFocusProduct,
  ]);

  return (
    <div className=" flex flex-col justify-center h-auto items-center">
      {loaded && productToShow ? (
        <div className="flex flex-col justify-center w-11/12 h-5/6 pt-12 gap-5">
          <div className="flex lg:flex-row flex-col justify-between bg-gradient-to-r from-base-100/70 to-base-300/95 px-10 py-5 w-full rounded-2xl h-5/6">
            <div className="flex flex-col justify-center items-center gap-2 lg:w-2/5">
              <img
                src={pictureToShow}
                alt=""
                className="lg:w-4/5 max-h-120 min-h-120 object-contain"
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
            <div
              className="lg:w-2/5 flex flex-col justify-start gap-2 bg-neutral/90 text-neutral-content md:py-2 py-5 mt-2 md:mt-0 px-10 rounded-lg h-full"
              z
            >
              <h1 className="text-4xl">{productToShow.title}</h1>
              <h2 className="text-2xl">{productToShow.artist}</h2>
              <h3 className="italic text-lg">{productToShow.releaseDate}</h3>
              <div className="flex flex-col justify-start gap-0.5 h-96 overflow-y-scroll">
                {productToShow.tracklist.map((t, index) => (
                  <p className="text-sm" key={index}>
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
              <div className="bg-success text-success-content py-0.5 px-2 rounded-2xl w-28 text-center font-mono font-semibold">
                <p>u$s {productToShow.price}</p>
              </div>
              <div>
                <p className="text-base font-extrabold py-2">
                  {productToShow.count > 0
                    ? `${
                        "Stock: " +
                        productToShow.count +
                        (productToShow.count > 1 ? " units" : " unit")
                      }`
                    : " Without stock"}
                </p>
              </div>
              <div className="flex flex-row justify-start gap-5">
                <div className="flex flex-col justify-start">
                  <input
                    type="number"
                    className="input validator input-primary input-md w-auto text-base-content bg-base-300"
                    required
                    placeholder="1"
                    min="1"
                    max={productToShow.count}
                    title="Must be greater than 1"
                    value={total}
                    onChange={handleChange}
                  />
                  <p className="validator-hint">
                    Must be greater than 1 / lesser than stock
                  </p>
                </div>

                <BaseButton
                  btnLabel={""}
                  btnAction={addToCart}
                  btnType={"accent"}
                  tooltip={"Add album to cart"}
                >
                  <FaCartPlus className="text-2xl" />
                </BaseButton>
              </div>
            </div>
          </div>

          <div className="flex flex-row flex-wrap lg:flex-nowrap overflow-x-scroll justify-center lg:justify-start w-full gap-3 h-1/6 mb-10 lg:mb-20  2xl:mb-10">
            {otherAlbums.map((album, index) => (
              <img
                src={getFront(album.coverImages)}
                className="w-20 h-20 lg:w-32 lg:h-32 hover:cursor-pointer"
                onClick={() => goToProd(album)}
                key={index}
              />
            ))}
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
