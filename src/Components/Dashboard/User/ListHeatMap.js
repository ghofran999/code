import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../App";
import { useHistory } from "react-router-dom";
import HeatMap from "./HeatMap";
import NavbarUser from "./NavbarUser";
function ListHeatMap() {
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
        <NavbarUser />
        {heatMapList.map((el, key) => {
          return (
            <div key={key}>
              <span class="border border-success">{el.name} </span>{" "}
              <button
                type="button"
                className="btn btn-outline-primary"
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
    return <HeatMap id={mapId} />;
  }
}
export default ListHeatMap;
