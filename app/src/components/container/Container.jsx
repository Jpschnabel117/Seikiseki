import * as d3 from "d3";
import React, { useEffect} from "react";
import worldMap from "../../assets/wrld-bp-1-svg.svg";
import Launchsite from "./Launchsite";

function Container() {
    let width;
    let height;
    // if(!data){
    //     return <pre>loading...</pre>
    // }

  return (
    <div className="mapScreen">
      {/* <img src={worldMap} className="worldMap" alt="mapsvg" /> */}
      <svg id="sites" className="overlay">
        <g>
          <Launchsite />
        </g>
      </svg>
    </div>
  );
}

export default Container;
