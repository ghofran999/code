import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../App";
import { useHistory } from "react-router-dom";
import "./admin.css";
function User({ id }) {
  const history = useHistory();
  const [idstate, setId] = useState(id);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userIsAdmin, setUserIsAdmin] = useState(0);
  const [userBanni, setUserBanni] = useState(0);
  function valider() {
    axiosInstance
      .post(
        "/users",
        {
          id: idstate,
          name: userName,
          email: userEmail,
          admin: userIsAdmin,
          banni: userBanni,
        },
        {
          headers: {
            Authorization: window.sessionStorage.getItem("id_token"),
          },
        }
      )
      .then((resp) => {
        if (resp.data) {
          alert("done");
        }
      });
  }
  useEffect(() => {
    axiosInstance
      .get("/users", {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
        params: {
          id: idstate,
        },
      })
      .then((resp) => {
        setUserName(resp.data[0].name);
        setUserEmail(resp.data[0].email);
        setUserIsAdmin(resp.data[0].isadmin);
        setUserBanni(resp.data[0].banni);
      });
  }, []);
  return (
    <div className="Users-container">
      <input value={idstate} disabled />
      <input
        value={userEmail}
        onChange={(event) => {
          setUserEmail(event.target.value);
        }}
      />
      <input
        value={userName}
        onChange={(event) => {
          setUserName(event.target.value);
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
      <button onClick={valider}>valider</button>
    </div>
  );
}
export default User;
