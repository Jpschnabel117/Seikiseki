import * as d3 from "d3";
import React, { useEffect } from "react";
import worldTopoData from "../../assets/worldMapRawData.json";
import { feature } from "topojson-client";
import { launchPopUp } from "./launchPopUp";

function Worldmapmarks(props) {
  const countries = worldTopoData.objects.ne_50m_admin_0_countries;
  const worldGeoData = feature(worldTopoData, countries);

  let launchSiteData = props.launchSiteData;

  const projection = d3.geoEquirectangular(); //change projections here
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  // const svgMap = d3.create("svg").attr("viewBox", [0, 0, 950, 480]);

  // const sites = svgMap.selectAll("circle")



  return (
    <g className="worldMapMarks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {worldGeoData.features.map((feature) => (
        <path className="wMapFeature" d={path(feature)} />
      ))}
      {launchSiteData.map((site) => {
        if (site.longitude !== 0 || site.latitude !== 0) {
          const [x, y] = projection([site.longitude, site.latitude]);
          return (
            <circle className="site" cx={x} cy={y} r={5}>
              <title>{site.location_name}</title>
            </circle>
          );
        }
      })}
    </g>
  );
}

export default Worldmapmarks;
