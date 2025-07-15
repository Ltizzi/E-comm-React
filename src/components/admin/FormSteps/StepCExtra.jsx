import React, { useEffect, useState } from "react";

const StepCExtra = ({ prod, handleInputChange, handleExtraChange }) => {
  const [producer, setProducer] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");

  const handleChange = (value, type) => {
    if (type === "producer" || type === "format") {
      if (type === "producer") setProducer(value);
      if (type === "format") setSelectedFormat(value);
      handleExtraChange(type, value);
    } else {
      if (type === "price") setPrice(value);
      if (type === "count") setCount(value);
      handleInputChange(type, value);
    }
  };

  useEffect(() => {
    if (prod) {
      if (prod.count) setCount(prod.count);
      if (prod.price) setPrice(prod.price);
      if (prod.extra.producer) setProducer(prod.extra.producer);
      if (prod.extra.format) setSelectedFormat(prod.extra.format);
    }
  }, [prod]);

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
            value={producer}
            onChange={(e) => handleChange(e.target.value, "producer")}
          />
          <div className="validator-hint">Album name is required</div>
        </div>

        <select
          defaultValue="Pick a Format"
          className="select select-secondary"
          value={selectedFormat}
          onChange={(e) => handleChange(e.target.value, "format")}
        >
          <option disabled={true}>Pick a format</option>
          <option value={"Vynil"}>Vynil</option>
          <option value={"CD"}>CD</option>
          <option value={"Casette"}>Casette</option>
        </select>

        <div>
          <legend className="fieldset-legend">Price</legend>
          <input
            type="text"
            className="input validator input-secondary"
            required
            placeholder="Type here"
            value={price}
            onChange={(e) => handleChange(e.target.value, "price")}
          />
          <div className="validator-hint">Price is required</div>
        </div>
        <div>
          <legend className="fieldset-legend">Stock count:</legend>
          <input
            type="number"
            className="input validator input-secondary"
            required
            placeholder="Type here"
            value={count}
            onChange={(e) => handleChange(e.target.value, "count")}
          />
          <div className="validator-hint">Stock count is required</div>
        </div>
      </fieldset>
    </div>
  );
};

export default StepCExtra;
