import React from "react";

const BaseButton = (props) => {
  const { btnLabel, btnAction, btnType, children, tooltip } = props;

  const bgClass =
    {
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
      lilError: "btn-error btn-xs",
    }[btnType] || "btn-default";
  return (
    <div className="tooltip tooltip-right tooltip-warning" data-tip={tooltip}>
      <button
        onClick={btnAction}
        className={`  font-semibold   text-sm hover:cursor-pointer btn ${bgClass} w-fit`}
      >
        {btnLabel && children}
        {btnLabel.length > 0 ? btnLabel : children}
      </button>
    </div>
  );
};

export default BaseButton;
