import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../App";
import { useHistory } from "react-router-dom";
import HeatMaper from "../User/HeatMap";
import NavbarAdmin from "./NavbarAdmin";
function ListeMaps() {
  const history = useHistory();
  const [heatMapList, setHeatMapList] = useState([]);
  const [mapId, setMapId] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/Heatmaps", {
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
  if (mapId == 0) {
    return (
      <div>
        <NavbarAdmin />

        {heatMapList.map((el, key) => {
          return (
            <div key={key}>
              <span>{el.name} </span>{" "}
              <button
                onClick={() => {
                  setMapId(el.id);
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
    return <HeatMaper id={mapId} />;
  }
}
export default ListeMaps;
