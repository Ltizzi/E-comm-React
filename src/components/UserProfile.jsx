import React from "react";
import BaseButton from "./common/BaseButton";

const UserProfile = (props) => {
  const { isAdmin, setAdmin } = props;
  return (
    <div className="flex flex-col justify-center items-center align-middle h-screen">
      <div className="flex flex-col justify-center text-center rounded-xl py-5 px-7 bg-base-100">
        <h1 className="text-white text-4xl">This is the user profile</h1>
        <BaseButton
          btnLabel={isAdmin ? "Admin off" : "Admin on"}
          btnAction={setAdmin}
          btnType={isAdmin ? "error" : "success"}
        />
      </div>
    </div>
  );
};

export default UserProfile;
