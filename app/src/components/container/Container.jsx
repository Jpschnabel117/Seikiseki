import * as d3 from "d3";
import React, { useEffect } from "react";
import Launchsitemarks  from "./Launchsitemarks";
import Worldmapmarks from "./Worldmapmarks";

function Container(props) {
    let worldMapData = props.worldGeoData

  return (
    <div className="mapScreen">
      {/* <img src={worldMap} className="worldMap" alt="mapsvg" /> */}
      <svg id="worldMap">
        <Worldmapmarks worldMapData={worldMapData}/>
        {/* <Launchsitemarks /> */}
      </svg>
    </div>
  );
}

export default Container;
