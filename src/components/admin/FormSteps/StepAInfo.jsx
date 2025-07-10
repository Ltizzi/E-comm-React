import React, { useState } from "react";

const StepAInfo = () => {
  const [images, setImages] = useState([]);

  function addImage(url) {
    try {
      new URL(url);
      setImages([...images, url]);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="flex flex-row justify-center gap-16 w-full">
      <fieldset className="fieldset">
        <div>
          <legend className="fieldset-legend">Album name:</legend>
          <input
            type="text"
            className="input validator input-secondary"
            required
            placeholder="Type here"
          />
          <div className="validator-hint">Album name is required</div>
        </div>

        <div>
          {" "}
          <legend className="fieldset-legend">Artist name:</legend>
          <input
            type="text"
            className="input input-secondary validator"
            required
            placeholder="Type here"
          />
          <div className="validator-hint">Artist's name is required</div>
        </div>
        <div>
          <legend className="fieldset-legend">
            Release date (YYYY-MM-DD):
          </legend>
          <input
            type="date"
            className="input input-secondary validator"
            required
            placeholder="Type here"
          />
          <div className="validator-hint">Release date is required</div>
        </div>
        <div className="flex flex-col items-end h-full">
          <div>
            <legend className="fieldset-legend">Cover images:</legend>
            <input
              type="text"
              className="input input-secondary validator"
              required
              placeholder="Paste URL here"
              onChange={(e) => addImage(e.target.value)}
            />
            <div className="validator-hint">Enter valid email address</div>
          </div>
          <div className="flex flex-row flex-wrap gap-3 justify-start w-full pb-5 h-20">
            {images.map((img) => (
              <img src={img} className="size-16" />
            ))}
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default StepAInfo;
