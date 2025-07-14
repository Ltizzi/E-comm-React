import React, { useEffect } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

const BaseModal = ({ isOpen, onClose, title, editor, children }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  //

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start lg:items-center justify-center z-40"
      onClick={onClose}
    >
      <div
        className={`bg-gradient-to-br from-base-100 via-base-200 to-base-300 rounded-lg pb-6 ${
          editor
            ? "lg:max-w-6xl lg:min-h-4/6 lg:max-h-4/6 lg:min-w-auto w-screen"
            : "h-auto w-auto"
        }  mx-4 text-primary-content`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between rounded-t-lg items-center mb-4 bg-secondary text-secondary-content px-1 lg:px-10 w-fit">
          <h2 className="text-xl font-bold px-6 py-2 text-center w-11/12">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-secondary-content text-2xl text-end hover:text-gray-700 hover:cursor-pointer w-1/12"
          >
            <AiFillCloseSquare />
          </button>
        </div>
        <div className="px-2 lg:px-8">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
