import React, { useState } from "react";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../App";
import NavbarExt from "../NavbarExt/NavbarExt";
import { Form, Button } from "react-bootstrap";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  function signUp() {
    if (password == confirmPassword) {
      axiosInstance
        .post("/Register", {
          email: email,
          password: password,
          name: name,
        })
        .then((resp) => {
          if (resp.data.err) {
            alert(resp.data.err);
          } else {
            alert("Success");
            history.push("/");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Password and Confirm Password aren't the same");
    }
  }
  return (
    <div className="SignUp-Page">
      <NavbarExt />

      <div className="login">
        <div className="col-md-6 login-form-1">
          <h3>Sign up</h3>
          <form>
            <div className="form-group">
              <input
                placeholder="Enter Name"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter email"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                defaultValue="Login"
                onClick={signUp}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
