import React from "react";

const StepCExtra = () => {
  return (
    <div className="flex flex-row justify-center gap-16 w-full">
      <fieldset className="fieldset">
        <div>
          <legend className="fieldset-legend">Producer name:</legend>
          <input
            type="text"
            className="input validator input-secondary"
            required
            placeholder="Type here"
          />
          <div className="validator-hint">Album name is required</div>
        </div>

        <select
          defaultValue="Pick a Format"
          className="select select-secondary"
        >
          <option disabled={true}>Pick a format</option>
          <option>Vynil</option>
          <option>CD</option>
          <option>Casette</option>
        </select>

        <div>
          <legend className="fieldset-legend">Price</legend>
          <input
            type="text"
            className="input validator input-secondary"
            required
            placeholder="Type here"
          />
          <div className="validator-hint">Price is required</div>
        </div>
        <div>
          <legend className="fieldset-legend">Stock count:</legend>
          <input
            type="text"
            className="input validator input-secondary"
            required
            placeholder="Type here"
          />
          <div className="validator-hint">Stock count is required</div>
        </div>

        <div className="flex flex-col items-end h-full">
          {/* <div>
            <legend className="fieldset-legend">Cover images:</legend>
            <input
              type="text"
              className="input validator"
              required
              placeholder="Paste URL here"
              onChange={(e) => addImage(e.target.value)}
            />
            <div className="validator-hint">Enter valid email address</div>
          </div>
          <div className="flex flex-row flex-wrap gap-3 justify-start w-full pb-5">
            {images.map((img) => (
              <img src={img} className="size-16" />
            ))}
          </div> */}
        </div>
      </fieldset>
    </div>
  );
};

export default StepCExtra;
