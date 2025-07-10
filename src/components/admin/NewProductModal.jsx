import React, { useEffect, useState } from "react";
import BaseModal from "../common/BaseModal";

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

  const [toggleText, setToggleText] = useState(false);

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

  useEffect(() => {
    if (!isEditor) {
      fetch("/data/extra.json")
        .then((data) => {
          if (!data) throw new Error("Something went wrong");
          return data;
        })
        .then((albums) => {
          setExtraAlbums(albums.json());
        })
        .catch((err) => console.error(err));
    } else setProduct(prod);
  }, [isEditor, prod]);

  return (
    <BaseModal
      isOpen={showEditor}
      title={!isEditor ? "Create new Album" : "Edit Album"}
      onClose={onClose}
    >
      <div className="w-full">
        {isEditor && <p>{prod.title}</p>}
        {!isEditor && (
          <div
            tabIndex={0}
            className="bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content collapse w-full"
          >
            <div className="collapse-title font-semibold">
              Añadiendo un nuevo album?
            </div>
            <div className="collapse-content text-sm">
              <div className="flex flex-col justify-start text-start text-xs lg:text-base gap-5">
                <p>
                  {" "}
                  Como el objeto product es un poco complejo, con motivos para
                  testear, he aquí una lista de albums extra para completar el
                  formulario fácilmente seleccionando uno de estos albums. De
                  todos modos el usuario puede crear su propio album (aunque no
                  es recomendado)
                </p>
                <p>
                  Si aún así decides crear tus propios albums, puedes optar por
                  generar una lista de temas con distintas duraciones y
                  completar esos campos automaticamente
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
};

export default NewProductModal;
