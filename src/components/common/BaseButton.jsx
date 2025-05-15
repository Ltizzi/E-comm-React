import React from "react";

const BaseButton = (props) => {
  const { btnLabel, btnAction, btnType } = props;

  const bgClass =
    {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      // Agrega más tipos si es necesario
    }[btnType] || "btn-default";
  return (
    <button
      onClick={btnAction}
      className={`py-1.5  transition-all duration-75 ease-in-out px-3 font-semibold text-white rounded-md text-sm hover:cursor-pointer ${bgClass} w-fit`}
    >
      {btnLabel}
    </button>
  );
};

export default BaseButton;
