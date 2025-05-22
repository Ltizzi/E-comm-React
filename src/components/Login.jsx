import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { login } = props;
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function submitLogin() {
    login({ email: mail, password: password });
    setTimeout(() => {
      navigate("/");
    }, 200);
  }
  return (
    <div className="w-full h-screen items-center flex flex-col justify-center align-middle">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-8">
        <legend className="fieldset-legend pt-12 ml-43 text-lg">Login</legend>
        <label className="label">Email</label>
        <input
          type="email"
          className="input input-primary"
          value={mail}
          placeholder="Email"
          onChange={(e) => setMail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input input-primary"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={submitLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
