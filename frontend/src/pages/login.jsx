import React, { useState } from "react";
import NotesBg from "../images/notesBg.png";
import { handleLogin } from "../utils/authentication";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="userPage d-flex align-items-center justify-content-center">
      <div className="container row  py-5 ">
        <div className="col-lg-6 col-xl-4 bg-white mx-auto rounded-3 shadow-lg p-4 d-flex flex-column align-items-center">
          <img
            src={NotesBg}
            alt=""
            className="notesBgImg mx-auto"
            style={{ width: "250px" }}
          />
          <p className="pocketNotesHead text-center">Pocket Notes</p>
          <form
            className="w-100"
            onSubmit={async (e) => {
              e.preventDefault();
              if (await handleLogin(email, password, rememberMe, setUser)) {
                setEmail("");
                setPassword("");
                navigate("/");
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1" className="fw-bold">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="exampleInputPassword1" className="fw-bold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label" for="exampleCheck1">
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Login
            </button>
            <div className="text-end m-2">
              <Link to="/register" className="text-decoration-none">
                Not Registered ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
