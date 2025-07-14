import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [mailAlreadyRegister, setMailAlreadyRegister] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const [registerError, setRegisterError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { alreadyRegister, registerUser, login } = useContext(AuthContext);

  const navigate = useNavigate();

  async function submit() {
    setWaiting(true);
    const res = await registerUser({ email: mail, password: password });
    console.log("RESPONSE");
    console.log(res);
    if (res === "OK") {
      setWaiting(false);
      const res = await login({ email: mail, password: password });
      if (res === "logged")
        setTimeout(() => {
          navigate("/");
        }, 200);
      else handleErrors(res);
    } else {
      setWaiting(false);
      handleErrors(res);
    }
  }

  function handleErrors(res) {
    setRegisterError(true);
    setErrorMsg(res);
    setTimeout(() => {
      setRegisterError(false);
      setErrorMsg("");
    }, 3000);
  }

  useEffect(() => {
    async function validateMail() {
      if (!mail) {
        setValidMail(false);
        return;
      }
      const isAlreadyRegister = await alreadyRegister(mail);
      setMailAlreadyRegister(isAlreadyRegister);
      const isValidFormat = mail.split("@").length === 2 && mail.includes(".");
      setValidMail(isValidFormat && !isAlreadyRegister);
    }
    validateMail();
  }, [mail, alreadyRegister]);

  useEffect(() => {
    const doPasswordMatch =
      password === controlPassword &&
      password.length > 0 &&
      controlPassword.length > 0;
    setPasswordMatch(doPasswordMatch);

    const regexPassword = /^[\x20-\x7E]+$/;
    const isValidPassword =
      doPasswordMatch &&
      regexPassword.test(password) &&
      password.length >= 5 &&
      password.length <= 12;
    setValidPassword(isValidPassword);
  }, [password, controlPassword]);

  return (
    <div className="w-full h-screen items-center flex flex-col justify-center align-middle">
      <fieldset className="flex flex-col gap-4 justify-center items-center  bg-base-200 border-base-300 rounded-box w-72 border p-8 pl-12  ">
        <legend className="font-bold text-center w-full pt-12 text-lg">
          Register
        </legend>
        <div>
          <label className="label">Email</label>

          <input
            type="email"
            className="input input-primary w-58 validator"
            value={mail}
            placeholder="Email"
            onChange={(e) => setMail(e.target.value)}
          />

          <p className="validator-hint">Must be a valid e-mail address</p>
          {mailAlreadyRegister ?? (
            <p className="validator-hint">E-mail is already registered</p>
          )}
        </div>

        <div>
          <label className="label">Password</label>

          <div className="flex flex-col items-center gap-2">
            <input
              type="password"
              className="input input-primary w-58 validator "
              placeholder="Password"
              required
              minLength="5"
              maxLength="12"
              pattern="^[\x20-\x7E]+$"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="validator-hint flex flex-col justify-start">
              {!passwordMatch
                ? "Must be between 5-12 valid characters"
                : "Password doesn't match"}
            </p>
          </div>
        </div>

        <div>
          <label className="label">Repeat password</label>
          <div className="flex flex-col items-start gap-2">
            <input
              type="password"
              className={`input input-primary ${
                passwordMatch ? "input-success" : "input-error"
              } w-58  `}
              placeholder="Repeat Password"
              value={controlPassword}
              required
              minLength="5"
              maxLength="12"
              pattern="^[\x20-\x7E]+$"
              onChange={(e) => {
                setControlPassword(e.target.value);
                setPasswordMatch(controlPassword === password);
              }}
            />
            <p className="text-sm text-error flex flex-col justify-start">
              {!passwordMatch && "Password doesn't match"}
            </p>
          </div>
        </div>

        <button
          className="btn  mt-4 w-24 mx-auto transition-colors btn-accent "
          onClick={submit}
          disabled={!validMail || !validPassword}
        >
          {!waiting ? "Sign up" : "Signing up..."}
        </button>
      </fieldset>
      {registerError && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-error text-2xl">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
