import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../App";

function CreerUtilisateur() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userIsAdmin, setUserIsAdmin] = useState(0);
  const [userBanni, setUserBanni] = useState(0);
  const history = useHistory();

  function creerUtilisateur() {
    if (password == confirmPassword) {
      axiosInstance
        .post(
          "/Register/admin",
          {
            email: email,
            password: password,
            name: name,
            isadmin: userIsAdmin,
            banni: userBanni,
          },
          {
            headers: {
              Authorization: window.sessionStorage.getItem("id_token"),
            },
          }
        )
        .then((resp) => {
          if (resp.data.err) {
            alert(resp.data.err);
          } else {
            alert("Success");
            history.push("/dashboard");
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
    <div className="CreerUtilisateur-Page">
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <input
        type="password"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
      />
      {userIsAdmin ? (
        <button
          onClick={() => {
            setUserIsAdmin(0);
          }}
        >
          rendre utilisateur
        </button>
      ) : (
        <button
          onClick={() => {
            setUserIsAdmin(1);
          }}
        >
          rendre admin
        </button>
      )}
      {userBanni ? (
        <button
          onClick={() => {
            setUserBanni(0);
          }}
        >
          débanir
        </button>
      ) : (
        <button
          onClick={() => {
            setUserBanni(1);
          }}
        >
          bannir
        </button>
      )}
      <button onClick={creerUtilisateur}>CreerUtilisateur</button>
    </div>
  );
}

export default CreerUtilisateur;
