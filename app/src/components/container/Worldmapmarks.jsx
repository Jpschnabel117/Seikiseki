import * as d3 from "d3";
import React, { useEffect } from "react";

function Worldmapmarks(props) {
  let worldData = props.worldMapData;
  let siteData = props.launchSiteData
  console.log(siteData);

  const projection = d3.geoEquirectangular(); //change projections here
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule()

  return (
    <g className="worldMapMarks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {worldData.features.map((feature) => (
        <path className="wMapFeature" d={path(feature)} />
      ))}


    </g>
  );
}

export default Worldmapmarks;
