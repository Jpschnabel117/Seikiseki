import * as d3 from "d3";
import { select } from "d3";
import React, { useEffect, useState } from "react";
import Worldmapmarks from "./Worldmapmarks";
import Launchsitemarks from "./Launchsitemarks";

function Container(props) {
  let launchSiteData = props.launchSiteData;
  let launchData = props.launchData;

  return (
    <div className="mapScreen">
      <svg id="worldMap">
        <Worldmapmarks
          launchSiteData={launchSiteData}
          launchData={launchData}
        />
      </svg>
      {/*     
      {isOpen && (        
        <div className="popup">
          <h2>{site.location_name}</h2>
          {launches ? (
            <ul>
              {launches.map((launch) => (
                <li key={launch.id}>{launch.name}</li>
              ))}
            </ul>
          ) : (
            <p>No launches scheduled at this site.</p>
          )}
          <button onClick={handleClose}>Close</button>
        </div>
      )} */}
    </div>
  );
}

export default Container;
