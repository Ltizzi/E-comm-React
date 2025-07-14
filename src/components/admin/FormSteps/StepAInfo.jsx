import React, { useEffect, useState } from "react";

const StepAInfo = ({ prod, handleInputChange }) => {
  const [images, setImages] = useState([]);
  const [imgTypes, setImgTypes] = useState([]);
  const [coverImages, setCoverImages] = useState([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imgTypeToEdit, setImgTypeToEdit] = useState(null);

  const handleChange = (e, type, index = null) => {
    let value = e.target.value;
    if (type !== "imgType") {
      if (type === "title") setTitle(value);
      if (type === "artist") setArtist(value);
      if (type === "releaseDate") setReleaseDate(value);
      handleInputChange(type, value);
    } else {
      let updatedTypes = [];
      if (imgTypeToEdit === index) {
        updatedTypes = imgTypes.map((type, i) => {
          if (i === index) return value;
          else return type;
        });
      } else {
        updatedTypes = [...imgTypes];

        updatedTypes[index] = value;
      }

      setImgTypes(updatedTypes);
      setImgTypeToEdit(null);

      if (images.length === imgTypes.length && updatedTypes.every((t) => t)) {
        const updatedCoverImg = images.map((img, i) => ({
          url: img,
          types: [updatedTypes[i]],
        }));
        setCoverImages(updatedCoverImg);
        handleInputChange("coverImages", updatedCoverImg);
      }
    }
  };

  const enableInput = (index) => {
    if (imgTypes[index]) {
      setImgTypeToEdit(index);
    }
  };

  const addImage = (url) => {
    try {
      new URL(url);
      if (images.includes(url)) {
        console.warn("URL ya agregada");
        return;
      }
      const newImages = [...images, url];
      setImages(newImages);
      const newImagesTypes = [...imgTypes];
      newImagesTypes.push("");
      setImgTypes(newImagesTypes);
      const updatedCoverImg = images
        .map((img, i) => ({
          url: img,
          types: [newImagesTypes[i]],
        }))
        .filter((ci) => ci.url && ci.url.trim() !== "");
      setCoverImages(updatedCoverImg);
      handleInputChange("coverImages", updatedCoverImg);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (prod) {
      if (prod.title) setTitle(prod.title);
      if (prod.artist) setArtist(prod.artist);
      if (
        Array.isArray(prod.coverImages) &&
        prod.coverImages &&
        prod.coverImages.length > 0 &&
        images.length === 0
      ) {
        const validCovers = prod.coverImages.filter(
          (img) => img.url && img.url.trim() !== ""
        );
        const imgs = validCovers.map((img) => img.url);
        const types = validCovers.map((img) => img.types);
        setCoverImages(prod.coverImages);
        setImages(imgs);
        setImgTypes(types);
      }
      if (prod.releaseDate) setReleaseDate(prod.releaseDate);
    }
  }, [prod, images]);

  return (
    <div className="flex flex-col justify-center items-center align-top h-full lg:-mt-10 gap-5 w-fit">
      <fieldset className="fieldset flex flex-col flex-nowrap lg:flex-row lg:flex-wrap gap-5">
        <div>
          <legend className="fieldset-legend">Album title:</legend>
          <input
            type="text"
            className="input validator input-secondary"
            required
            placeholder="Type here"
            value={title}
            onChange={(e) => handleChange(e, "title")}
          />
          <div className="validator-hint">Album name is required</div>
        </div>

        <div>
          <legend className="fieldset-legend">Artist name:</legend>
          <input
            type="text"
            className="input input-secondary validator"
            required
            placeholder="Type here"
            value={artist}
            onChange={(e) => handleChange(e, "artist")}
          />
          <div className="validator-hint">Artist's name is required</div>
        </div>
        <div>
          <legend className="fieldset-legend">Release date:</legend>
          <input
            type="date"
            className="input input-secondary validator"
            required
            placeholder="Type here"
            value={releaseDate}
            onChange={(e) => handleChange(e, "releaseDate")}
          />
          <div className="validator-hint">Release date is required</div>
        </div>
      </fieldset>
      <div className="text-xs text-start flex flex-col gap-0.5 ">
        <p>Press enter to correctly add image's URL</p>
      </div>
      <div className="flex flex-col items-end h-full">
        <div>
          <legend className="fieldset-legend">Cover images:</legend>
          <input
            type="text"
            className="input input-secondary validator w-96"
            required
            placeholder="Paste URL here"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const url = e.target.value.trim();
                if (url !== "") {
                  addImage(url);
                  e.target.value = "";
                }
              }
            }}
          />
          <div className="validator-hint">Enter valid URL address</div>
        </div>
        <div className="flex flex-col  gap-3 justify-center items-center w-full pb-5 h-72 overflow-y-scroll">
          <div className="text-xs text-start flex flex-col gap-0.5 ">
            <p>Press enter to correctly add a new cover image</p>
            <p>Click on cover image type label to enable select input</p>
          </div>
          <table className="table w-72">
            <thead>
              <tr>
                <th>Image</th>
                <th>Type</th>
                <th>Edit Type</th>
              </tr>
            </thead>
            <tbody>
              {images
                .filter((img) => img)
                .map((img, index) => (
                  <tr key={index}>
                    <td>
                      <img src={img} alt="" className="size-10" />
                    </td>
                    <td>
                      <div
                        className="tooltip size-full tooltip-bottom tooltip-info"
                        data-tip="Click to edit"
                        onClick={() => enableInput(index)}
                      >
                        <p>{imgTypes[index] ? imgTypes[index] : ""}</p>
                      </div>
                    </td>

                    <td>
                      <select
                        value={
                          imgTypes[index] ? imgTypes[index] : "Pick a type"
                        }
                        className="select select-secondary"
                        required
                        onChange={(e) => {
                          handleChange(e, "imgType", index);
                        }}
                        disabled={imgTypes[index] && imgTypeToEdit != index}
                      >
                        <option disabled={true}>Pick a type</option>
                        <option value={"Front"}>Front</option>
                        <option value={"Back"}>Back</option>
                        <option value={"Liner"}>Liner</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"Booklet"}>Booklet</option>
                        <option value={"Other"}>Other</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StepAInfo;
