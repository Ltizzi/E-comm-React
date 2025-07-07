import React, { useContext } from "react";
import BaseButton from "./common/BaseButton";

import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col justify-center items-center align-middle h-screen">
      <div className="flex flex-col justify-center text-center items-center gap-4 w-1/3 rounded-xl py-10 px-7 bg-base-100/80">
        <h1 className="text-white text-5xl font-bold">
          {user.nickname} profile
        </h1>
        <img src={user.avatar} className="rounded-full w-40" alt="" />
        <p className="text-3xl font-light">{user.name + " " + user.lastname}</p>
        <p className="text-xl font-extralight italic">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
