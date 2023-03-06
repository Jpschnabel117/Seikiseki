import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import Launchsitemarks from "./Launchsitemarks";
import Worldmapmarks from "./Worldmapmarks";

function Container(props) {
  let worldMapData = props.worldGeoData;
  let launchSiteData = props.launchSiteData;
//   const [locationData, setLocationData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch("http://localhost:3000/getLaunches");
//       const data = await response.json();
//       setLocationData(data);
//     };
//     fetchData();
//   }, []);

//   console.log(locationData);
  return (
    <div className="mapScreen">
      {/* <img src={worldMap} className="worldMap" alt="mapsvg" /> */}
      <svg id="worldMap">
        <Worldmapmarks
          worldMapData={worldMapData}
          launchSiteData={launchSiteData}
        />
      </svg>
    </div>
  );
}

export default Container;
