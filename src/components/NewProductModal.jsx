import React, { useState } from "react";
import BaseModal from "./common/BaseModal";

const NewProductModal = ({ isEditor, prod, showEditor, showEditorModal }) => {
  function onClose() {
    showEditorModal();
  }
  return (
    <BaseModal
      isOpen={showEditor}
      title={!isEditor ? "Create new Album" : "Edit Album"}
      onClose={onClose}
    >
      <h1 className="text-black">HOLAAA</h1>
    </BaseModal>
  );
};

export default NewProductModal;
