import React, { useEffect, useState } from "react";
import BaseModal from "../common/BaseModal";
import StepAInfo from "./FormSteps/StepAInfo";
import StepBTracks from "./FormSteps/StepBTracks";
import StepCExtra from "./FormSteps/StepCExtra";
import {
  ALBUM_TEMPLATE,
  getFront,
  getShorterString,
  getTrackDuration,
} from "../../utils/utils";
import { API_URL } from "../../context/ProductContext";

const NewProductModal = ({
  isEditor,
  prod,
  showEditor,
  showEditorModal,
  callUpdate,
}) => {
  const [product, setProduct] = useState({});
  const [extraAlbums, setExtraAlbums] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    if (!isEditor) setProduct(ALBUM_TEMPLATE);
    showEditorModal();
  };

  const getLastId = () => {
    const id = JSON.parse(localStorage.getItem("eComLastId")) || 1000;
    if (id === 1000) return id;
    else {
      localStorage.setItem("eComLastId", JSON.stringify(id + 1));
      return id + 1;
    }
  };

  const submit = async () => {
    setIsLoading(true);
    if (isEditor) product.id = getLastId();
    const HTTP_METHOD = isEditor ? "PUT" : "POST";
    const URL = API_URL + (isEditor ? `/${product.id}` : "");
    fetch(URL, {
      method: HTTP_METHOD,
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (!res) throw new Error("Something went wrong accesing API");
        return res.json();
      })
      .then(async () => {
        const msg = isEditor ? "Product updated!" : "Product created!";
        await callUpdate("success", msg);
        showEditorModal();
      })
      .catch((err) => console.error(err));
  };

  const goPrev = () => {
    if (!isEditor && activeTab > 0) setActiveTab((prev) => prev - 1);
    else if (activeTab > 1) setActiveTab((prev) => prev - 1);
  };

  const goNext = () => {
    if (activeTab < 4) setActiveTab((prev) => prev + 1);
  };

  const addAlbum = (album) => {
    setProduct(album);
    setActiveTab(4);
  };

  const handleInputChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExtraChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      extra: {
        ...prev.extra,
        [field]: value,
      },
    }));
  };

  const addTracksDuration = (durations) => {
    if (!durations || !Array.isArray(durations)) return;

    let totalDuration = 0;
    durations.forEach((dur) => (totalDuration += dur));
    setProduct((prev) => ({
      ...prev,
      extra: {
        ...prev.extra,
        trackDuration: durations,
        duration: totalDuration,
        trackCount: durations.length,
      },
    }));
  };

  useEffect(() => {
    if (!isEditor) {
      setProduct(ALBUM_TEMPLATE);
      setActiveTab(0);
      fetch("/data/extra.json")
        .then((res) => {
          if (!res) throw new Error("Something went wrong");
          return res.json();
        })
        .then((albums) => {
          setExtraAlbums(albums);
        })
        .catch((err) => console.error(err));
    } else {
      setActiveTab(1);
      setProduct(prod);
    }
  }, [isEditor, prod]);

  return (
    <BaseModal
      isOpen={showEditor}
      title={!isEditor ? "Create new Album" : "Edit Album"}
      onClose={onClose}
      editor={true}
    >
      <div className="flex flex-col justify-between items-center h-fit gap-3 relative">
        <ul className="steps text-xs  w-3/4 text-base-content h-1/6">
          {!isEditor && (
            <li
              className={`step  step-primary hover:cursor-pointer`}
              onClick={() => setActiveTab(0)}
            >
              New Album
            </li>
          )}
          <li
            className={`step hover:cursor-pointer  ${
              activeTab >= 1 ? "step-primary" : ""
            }`}
            onClick={() => setActiveTab(1)}
          >
            Info
          </li>
          <li
            className={`step hover:cursor-pointer  ${
              activeTab >= 2 ? "step-primary" : ""
            }`}
            onClick={() => setActiveTab(2)}
          >
            Tracks
          </li>
          <li
            className={`step hover:cursor-pointer ${
              activeTab >= 3 ? "step-primary" : ""
            }`}
            onClick={() => setActiveTab(3)}
          >
            Extra
          </li>

          <li
            className={`step hover:cursor-pointer ${
              activeTab >= 4 ? "step-primary" : ""
            }`}
            onClick={() => setActiveTab(4)}
          >
            Finish
          </li>
        </ul>
        <div className="w-full   h-4/6 min-h-140 lg:min-h-140 flex flex-col justify-center items-center align-top text-base-content gap-4">
          {!isEditor && activeTab === 0 && (
            <div className="flex flex-col gap-1 h-10/12">
              success
              <div
                tabIndex={0}
                className="bg-accent text-accent-content focus:bg-warning   collapse w-full"
              >
                <div className="collapse-title font-semibold">
                  Añadiendo un nuevo album?
                </div>
                <div className="collapse-content ">
                  <div className="flex flex-col justify-start text-start text-xs lg:text-sm  gap-2">
                    <p>
                      Como el objeto product es un poco complejo, con motivos
                      para testear, se provee una lista de albums extra para
                      completar el formulario fácilmente seleccionando uno de
                      estos albums. De todos modos el usuario puede crear su
                      propio album (aunque no es recomendado)
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-1 flex-wrap pt-5 overflow-y-auto overflow-x-clip h-100">
                {extraAlbums.map((album) => (
                  <div className="tooltip tooltip-bottom">
                    <div className="tooltip-content flex flex-col gap-1 py-3 px-3 z-50 justify-start text-start text-base max-w-40">
                      <img
                        src={getFront(album.coverImages)}
                        alt={`Front cover picture from ${album.title}`}
                        className="size-10 lg:size-32 "
                        onClick={() => addAlbum(album)}
                      />
                      <p className="font-extrabold">"{album.title}"</p>
                      <p className="italic">by {album.artist}</p>
                      <p>Click to add!</p>
                    </div>
                    <img
                      src={getFront(album.coverImages)}
                      alt={`Front cover picture from ${album.title}`}
                      className="size-10 lg:size-16 hover:cursor-pointer hover:border-4 border-accent transition-all duration-150"
                      onClick={() => addAlbum(album)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="h-auto">
            {activeTab === 1 && (
              <StepAInfo prod={product} handleInputChange={handleInputChange} />
            )}
            {activeTab === 2 && (
              <StepBTracks
                prod={product}
                handleInputChange={handleInputChange}
                addTracksDuration={addTracksDuration}
              />
            )}

            {activeTab === 3 && (
              <StepCExtra
                prod={product}
                handleExtraChange={handleExtraChange}
                handleInputChange={handleInputChange}
              />
            )}
            {activeTab === 4 && (
              <div className="w-fit flex flex-col justify-center items-center">
                {product.title && product.artist && (
                  <div className="text-sm flex flex-col gap-2 text-center">
                    <p className="text-xl font-extrabold">
                      {product.title} by {product.artist}
                    </p>
                    <div className="flex flex-row justify-evenly gap-10">
                      <div className="text-end">
                        <p className="italic">
                          released in {product.releaseDate}
                        </p>
                        <p className="font-semibold">u$s {product.price}</p>
                        <p className="text-xs font-light">
                          {product.count +
                            `${product.count > 1 ? " units" : " unit"}`}
                        </p>
                      </div>
                      <div className="flex flex-row flew-wrap gap-1">
                        <img
                          src={getFront(product.coverImages)}
                          className="size-16"
                          alt=""
                        />
                      </div>
                    </div>
                    <ul className="flex flex-col gap-0.5 text-xs py-2 overflow-y-auto h-64">
                      {product.tracklist.map((t, index) => (
                        <li
                          className="flex flex-row justify-between w-96"
                          key={index}
                        >
                          <span>
                            {index + 1 + ". " + getShorterString(t, 25)}
                          </span>
                          <span>
                            {getTrackDuration(
                              product.extra.trackDuration[index]
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="btn btn-accent flex flex-row gap-5"
                  onClick={async () => {
                    await submit();
                  }}
                  disabled={!product.title}
                >
                  {isLoading ? (
                    <>
                      Loading...
                      <span className="loading loading-dots loading-xl"></span>
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="join grid grid-cols-2  w-full h-1/6">
          <button
            className="join-item btn btn-outline btn-secondary "
            onClick={goPrev}
          >
            Previous page
          </button>
          <button
            className="join-item btn btn-secondary btn-outline"
            onClick={goNext}
          >
            Next
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default NewProductModal;
