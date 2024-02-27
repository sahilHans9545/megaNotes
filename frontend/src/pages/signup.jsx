import React, { useState } from "react";
import NotesBg from "../images/notesBg.png";
import { Link, useNavigate } from "react-router-dom";
import { handleSignUp } from "../utils/authentication";
import { toast } from "react-toastify";
const Signup = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="userPage d-flex align-items-center justify-content-center">
      <div className="container row py-5 ">
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
              if (await handleSignUp(email, password, setUser)) {
                setEmail("");
                setPassword("");
                toast("Registered Successfully");
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

            <button type="submit" className="btn btn-primary w-100 mt-4">
              Register
            </button>
            <div className="text-end m-2">
              <Link to="/login" className="text-decoration-none">
                Already a user ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
