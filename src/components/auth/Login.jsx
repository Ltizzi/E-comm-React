import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  // const { login } = props;
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [hasError, setHasError] = useState(false);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  async function submitLogin() {
    const res = await login({ email: mail, password: password });
    if (res === "logged")
      setTimeout(() => {
        navigate("/");
      }, 200);
    else {
      setHasError(true);
      setErrorMsg(res);
      clearErrors(3000);
    }
  }

  function clearErrors(ms) {
    setTimeout(() => {
      setHasError(false);
      setErrorMsg("");
    }, ms);
  }

  function handleMail(mail) {
    setMail(mail);
    const parts = mail.split("@");
    if (parts.length == 2) setMail(mail);
    else {
      setHasError(true);
      setErrorMsg("Enter a valid e-mail");
      clearErrors(3000);
    }
  }

  function handlePassword(pass) {
    const regexPassword = /^[\x20-\x7E]+$/;
    setPassword(pass);
    if (!regexPassword.test(pass)) {
      setHasError(true);
      setErrorMsg(
        "You can only use letters, numbers and some specials characters"
      );
      clearErrors(3000);
    }
    if (pass.length < 5 || pass.length > 12) {
      setHasError(true);
      setErrorMsg("Valid password has between 5 and 12 characters");
      clearErrors(3000);
    }
  }

  return (
    <div className="w-full h-screen items-center flex flex-col justify-center align-middle">
      <fieldset className="flex flex-col gap-4 justify-center items-center  bg-base-200 border-base-300 rounded-box w-72 border p-8  ">
        <legend className="font-bold text-center w-full pt-12 text-lg">
          Login
        </legend>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-primary validator"
            value={mail}
            placeholder="Email"
            onChange={(e) => handleMail(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input input-primary validator"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-start text-sm text-start w-56">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <span className="hover:cursor-pointer text-accent font-semibold underline italic">
              Create one
            </span>
          </Link>
        </div>
        <button
          className="btn btn-neutral mt-4 w-24 mx-auto"
          onClick={submitLogin}
        >
          Login
        </button>
      </fieldset>
      {hasError && (
        <div className="toast toast-center z-20 mt-36 toast-middle">
          <div className="alert alert-error text-2xl">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
