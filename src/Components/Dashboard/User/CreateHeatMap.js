import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../App";
import { useHistory } from "react-router-dom";
import NavbarUser from "./NavbarUser";

function CreateHeatMap() {
  const [idmap, setIdmap] = useState(0);
  const [steps, setSteps] = useState(0);
  const [script, setScript] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (idmap > 0) {
      setScript(`
      function getScreenSize (trueSize) {
      if (trueSize === void 0) {
        trueSize = true;
      }
      if (document.documentElement && trueSize) {
        return (
          document.documentElement.clientWidth.toString() +
          "x" +
          document.documentElement.clientHeight.toString()
        );
      } else {
        return window.innerWidth.toString() + "x" + window.innerHeight.toString();
      }
    };
    
    function generateCoordMap (mapId) {
      if (mapId === void 0) {
        mapId = "default";
      }
      var screenSize = getScreenSize();
      var id = "_coordMap_" + mapId;
      if (id in window) {
        return false;
      }
      window[id] = {};
      var coordMap = window[id];
      window.addEventListener("resize", function () {
        return (screenSize = getScreenSize(false));
      });
      var hoverTimer,
        hoverTime = 0;
      document.addEventListener("mousemove", function (event) {
        clearInterval(hoverTimer);
        if (!(screenSize in coordMap)) {
          coordMap[screenSize] = [];
        }
        var x = event.clientX + window.scrollX,
          y = event.clientY + window.scrollY;
        coordMap[screenSize].push([x, y]);
        hoverTimer = setInterval(function () {
          coordMap[screenSize].push([x, y]);
          hoverTime++;
          if (hoverTime > 5) {
            clearInterval(hoverTimer);
          }
        }, 1000);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:7328/api/Heatmaps/update", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        if (coordMap[screenSize].length > 100) {
          xhr.send(
            JSON.stringify({
              id: ${idmap} ,
              data: coordMap[screenSize],
            })
          );
          coordMap[screenSize] = [];
        }
      });
    };
    generateCoordMap();`);
    }
  }, [idmap]);
  if (steps == 0) {
    return (
      <div>
        <NavbarUser />
        <div>
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                setSteps(steps + 1);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (steps == 1) {
    return (
      <div>
        <NavbarUser />
        <h2>you ll create a map named {name}</h2>
        <button
          type="button"
          className="abcde"
          className="btn btn-outline-primary"
          onClick={() => {
            axiosInstance
              .post(
                "/Heatmaps/Create",
                {
                  name: name,
                },
                {
                  headers: {
                    Authorization: window.sessionStorage.getItem("id_token"),
                  },
                }
              )
              .then((resp) => {
                console.log(resp);
                if (resp.data.error) {
                  alert(resp.data.error);
                } else {
                  if (resp.data.id) {
                    setIdmap(resp.data.id);
                    setSteps(steps + 1);
                  }
                }
              });
          }}
        >
          Valider
        </button>
      </div>
    );
  }
  if (steps == 2) {
    return (
      <div>
        <NavbarUser />
        <h2>instruction to add the script</h2>
        <pre>{script}</pre>
        <button
        type="button"
        className="abcde"
        className="btn btn-outline-primary"
/*         onClick={() => {
        }} */
        >
          Copy
        </button>
        <button
          type="button"
          className="abcde"
          className="btn btn-outline-primary"
          onClick={() => {
            history.goBack();
          }}
        >
          Retour
        </button>
      </div>
    );
  }
}
export default CreateHeatMap;
