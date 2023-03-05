import * as d3 from "d3";
import React, { useEffect } from "react";

function Worldmapmarks(props) {
  let data = props.worldMapData;
  console.log(data);

  const projection = d3.geoEquirectangular(); //change projections here
  const path = d3.geoPath(projection);

  return (
    <g className="worldMapMarks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      {data.features.map((feature) => (
        <path className="wMapFeature" d={path(feature)} />
      ))}
    </g>
  );
}

export default Worldmapmarks;
