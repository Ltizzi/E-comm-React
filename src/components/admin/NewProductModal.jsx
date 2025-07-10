import React, { useEffect, useState } from "react";
import BaseModal from "../common/BaseModal";
import StepAInfo from "./FormSteps/StepAInfo";
import StepBTracks from "./FormSteps/StepBTracks";
import StepCExtra from "./FormSteps/StepCExtra";
import StepDBussines from "./FormSteps/StepDBussines";
import { getFront } from "../../utils/utils";

const NewProductModal = ({ isEditor, prod, showEditor, showEditorModal }) => {
  const [product, setProduct] = useState({
    id: 0,
    artist: "",
    title: "",
    releaseDate: "",
    coverImages: [{ url: "", types: "" }],
    tracklist: [""],
    extra: {
      date: "",
      producer: "",
      format: "",
      trackCount: 0,
      duration: 0,
      trackDuration: [0],
    },
    price: 0,
    count: 0,
  });
  const [extraAlbums, setExtraAlbums] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  const [collapseAlbums, setCollapseAlbums] = useState(true);

  function onClose() {
    showEditorModal();
  }

  function getPrice(min, max) {
    return parseFloat(Math.random() * (max - min) + min).toFixed(2);
  }

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getLastId() {
    const id = JSON.parse(localStorage.getItem("eComLastId")) || 1000;
    if (id === 1000) return id;
    else {
      localStorage.setItem("eComLastId", JSON.stringify(id + 1));
      return id + 1;
    }
  }

  async function submit() {
    const product = {
      id: getLastId(),
      artist: "",
      title: "",
      releaseDate: "",
      coverImages: [{ url: "", types: "" }],
      tracklist: [""],
      extra: {
        date: "",
        producer: "",
        format: "",
        trackCount: 0,
        duration: 0,
        trackDuration: [0],
      },
      price: getPrice(19.99, 124.99),
      count: getRandomNum(1, 10),
    };
  }

  function goPrev() {
    if (activeTab > 0) setActiveTab((prev) => prev - 1);
  }

  function goNext() {
    if (activeTab < 5) setActiveTab((prev) => prev + 1);
  }

  function addAlbum(album) {
    setProduct(album);
    setActiveTab(5);
  }

  useEffect(() => {
    if (!isEditor) {
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
    >
      <div className="flex flex-col justify-between h-fit">
        <div className="w-full h-fit flex flex-col justify-center items-center text-base-content gap-4 relative">
          <ul className="steps text-xs  w-3/4 ">
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
              className={`step hover:cursor-pointer  ${
                activeTab >= 4 ? "step-primary" : ""
              }`}
              onClick={() => setActiveTab(4)}
            >
              Business
            </li>
            <li
              className={`step hover:cursor-pointer ${
                activeTab >= 5 ? "step-primary" : ""
              }`}
              onClick={() => setActiveTab(5)}
            >
              Finish
            </li>
          </ul>

          {!isEditor && activeTab === 0 && (
            <div className="flex flex-col gap-1 ">
              <div
                tabIndex={0}
                className="bg-secondary text-primary-content collapse-open  collapse w-full"
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
                    <p>
                      Si aún así decides crear tus propios albums, puedes optar
                      por generar una lista de temas con distintas duraciones y
                      completar esos campos automaticamente
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-1 flex-wrap pt-1 overflow-y-auto overflow-x-clip h-110">
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
          {activeTab === 1 && <StepAInfo />}
          {activeTab === 2 && <StepBTracks />}
          {activeTab === 3 && <StepCExtra />}
          {activeTab === 4 && <StepDBussines />}
          {activeTab === 5 && (
            <div>
              <h1>Finish</h1>
              <p>{product.title}</p>
            </div>
          )}
        </div>
        <div className="join grid grid-cols-2">
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
