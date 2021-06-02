import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../App";
import NavbarExt from "../NavbarExt/NavbarExt";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (window.sessionStorage.getItem("id_token") != null) {
      history.push("/dashboard");
    }
  }, []);
  function login() {
    axiosInstance
      .post("/login", {
        email: email,
        password: password,
      })
      .then((resp) => {
        if (resp.data.err) {
          setPassword("");
          alert(resp.data.err);
        } else {
          window.sessionStorage.setItem("email", email);
          window.sessionStorage.setItem("id_token", resp.data.token); //JSON WEB TOKEN
          window.sessionStorage.setItem("role", resp.data.role); //ADMIN OU UTILISATEUR
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        alert(err);
      });
    history.push("dashboard");
  }
  return (
    <div>
      <NavbarExt />
      <div className="login">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder=" Email "
                defaultValue="Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder=" Password "
                defaultValue="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                defaultValue="Login"
                onClick={login}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
