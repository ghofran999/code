import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../App";
import { useHistory } from "react-router-dom";
import User from "./User";
import NavbarAdmin from "./NavbarAdmin";
function ListeUsers() {
  const history = useHistory();
  const [heatMapList, setHeatMapList] = useState([]);
  const [userID, setUserID] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/Users/all", {
        headers: {
          Authorization: window.sessionStorage.getItem("id_token"),
        },
      })
      .then((resp) => {
        setHeatMapList(resp.data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  if (userID == 0) {
    return (
      <div>
        <NavbarAdmin />
        <button
          onClick={() => {
            history.push("/dashboard/creeruser");
          }}
        >
          Creer un Utilisateur
        </button>
        {heatMapList.map((el, key) => {
          return (
            <div key={key}>
              <span>{el.name} </span>
              <button
                onClick={() => {
                  setUserID(el.id);
                }}
              >
                afficher
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <User id={userID} />;
  }
}
export default ListeUsers;
