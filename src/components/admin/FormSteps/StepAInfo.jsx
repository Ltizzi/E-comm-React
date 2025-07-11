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
      } else updatedTypes = [...imgTypes, value];

      setImgTypes(updatedTypes);
      setImgTypeToEdit(null);

      if (images.length === imgTypes.length) {
        const updatedCoverImg = images.map((img, i) => {
          return { url: img, types: [imgTypes[i]] };
        });
        setCoverImages(updatedCoverImg);
        handleInputChange("coverImages", coverImages);
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
      setImages([...images, url]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (prod) {
      if (prod.title) setTitle(prod.title);
      if (prod.artist) setArtist(prod.artist);
      if (prod.coverImages) {
        setCoverImages(prod.coverImages);
        let imgs = [];
        let types = [];
        prod.coverImages.forEach((img) => {
          imgs.push(img.url);
          types.push(img.types[0]);
        });
        setImages(imgs);
        setImgTypes(types);
      }
      if (prod.releaseDate) setReleaseDate(prod.releaseDate);
    }
  }, [prod]);

  return (
    <div className="flex flex-col justify-center items-center align-top h-full lg:-mt-10 gap-5 w-full">
      <fieldset className="fieldset flex flex-row flex-wrap gap-5">
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
                addImage(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <div className="validator-hint">Enter valid URL address</div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-start w-full pb-5 h-72 overflow-y-scroll">
          <table className="table w-52">
            <thead>
              <tr>
                <th>Image</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img, index) => (
                <tr key={index}>
                  <td>
                    <img src={img} alt="" className="size-10" />
                  </td>

                  <td onClick={() => enableInput(index)}>
                    <div
                      className="tooltip size-full tooltip-bottom tooltip-info"
                      data-tip="Click to edit"
                    >
                      <select
                        defaultValue={
                          imgTypes[index] ? imgTypes[index] : "Pick a type"
                        }
                        className="select select-secondary"
                        onChange={(e) => handleChange(e, "imgType", index)}
                      >
                        <option disabled={true}>Pick a type</option>
                        <option value={"Front"}>Front</option>
                        <option value={"Back"}>Back</option>
                        <option value={"Liner"}>Liner</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"Booklet"}>Booklet</option>
                        <option value={"Other"}>Other</option>
                      </select>
                    </div>
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
