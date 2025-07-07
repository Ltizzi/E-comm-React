import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Register = () => {
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  const [controlPassword, setControlPassword] = useState();

  const [passwordMatch, setPasswordMatch] = useState();
  const [validMail, setValidMail] = useState();

  function handleMail(mail) {}

  function handlePassword(e, isControl) {
    if (isControl) {
      setControlPassword(e);
    } else setPassword(e);

    setPasswordMatch(password === controlPassword);
  }

  function submit() {}
  return (
    <div className="w-full h-screen items-center flex flex-col justify-center align-middle">
      <fieldset className="flex flex-col gap-4 justify-center items-center  bg-base-200 border-base-300 rounded-box w-72 border p-8 pl-12  ">
        <legend className="font-bold text-center w-full pt-12 text-lg">
          Register
        </legend>
        <div>
          <label className="label">Email</label>
          <div className="flex flex-row items-center gap-2">
            <input
              type="email"
              className="input input-primary w-58"
              value={mail}
              placeholder="Email"
              onChange={(e) => handleMail(e.target.value, false)}
            />
            <div className="w-3">
              {validMail && <FaCheckCircle className="text-success" />}
            </div>
          </div>
        </div>

        <div>
          <label className="label">Password</label>
          <div className="flex flex-row items-center gap-2">
            <input
              type="password"
              className="input input-primary relative w-58"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePassword(e.target.value, true)}
            />
            <div className="w-3">
              {passwordMatch && <FaCheckCircle className="text-success" />}
            </div>
          </div>
        </div>

        <div>
          <label className="label">Repeat password</label>
          <div className="flex flex-row items-center gap-2">
            <input
              type="password"
              className="input input-primary w-58"
              placeholder="Repeat Password"
              value={controlPassword}
              onChange={(e) => handlePassword(e.target.value)}
            />
            <div className="w-3">
              {passwordMatch && <FaCheckCircle className="text-success" />}
            </div>
          </div>
        </div>

        <button className="btn btn-neutral mt-4 w-24 mx-auto" onClick={submit}>
          Login
        </button>
      </fieldset>
      {/* {hasError && (
        <div className="toast toast-center z-20 mt-36 toast-middle">
          <div className="alert alert-error text-2xl">
            <span>{errorMsg}</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Register;
