import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Worldmapmarks from "./Worldmapmarks";

function Container(props) {
  let launchSiteData = props.launchSiteData;
  let launchData = props.launchData;

  return (
    <div className="mapScreen">
      {/* <img src={worldMap} className="worldMap" alt="mapsvg" /> */}
      <svg id="worldMap">
        <Worldmapmarks
          launchSiteData={launchSiteData}
          launchData={launchData}
        />
      </svg>
    </div>
  );
}

export default Container;
