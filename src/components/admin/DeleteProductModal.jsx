import React, { useState } from "react";
import BaseModal from "../common/BaseModal";
import BaseButton from "../common/BaseButton";
import { API_URL } from "../../context/ProductContext";

const DeleteProductModal = ({ prod, isOpen, closeDelete, callUpdate }) => {
  const [isWaiting, setIsWaiting] = useState(false);

  const onClose = () => {
    closeDelete();
  };

  const submitDelete = async () => {
    setIsWaiting(true);
    fetch(API_URL + `/${prod.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        setIsWaiting(false);
        if (!res)
          throw new Error("Something went wrong while waiting server response");
        return res.json();
      })
      .then(() => {
        callUpdate("error", "Product deleted!");
        closeDelete();
      });
  };

  return (
    <div>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Delete"}
        editor={false}
      >
        <div className="flex flex-col justify-center gap-5 text-base-content w-fit max-w-screen">
          <h1 className="text-center text-sm lg:text-lg font-bold">
            You are about to delete {prod.title} by {prod.artist} with id nº
            {prod.id},
          </h1>
          <h2 className="text-center text-sm lg:text-lg font-semibold">
            Are you sure?
          </h2>

          <div className="flex flex-row justify-center items-center gap-5">
            <BaseButton
              btnLabel={"Cancel"}
              btnAction={onClose}
              btnType={"warning"}
              tooltip={"Cancel delete product"}
              rounded={false}
            />

            <BaseButton
              btnLabel={"DELETE"}
              btnAction={submitDelete}
              btnType={"error"}
              tooltip={"Confirm delete product"}
              rounded={false}
            >
              {isWaiting && (
                <span className="loading loading-dots loading-xl"></span>
              )}
            </BaseButton>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default DeleteProductModal;
