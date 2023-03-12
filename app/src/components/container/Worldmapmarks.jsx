import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import Launchsitemarks from "./Launchsitemarks";
import { Link } from "react-router-dom";

function WorldMapMarks(props) {
  const { worldGeoData, locations, launchIndex } = props;
  const launchSiteData = locations;
  console.log(launchIndex)

  const projection = d3.geoEquirectangular();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  // ---------------------------------------------------------------

  return (
    <>
      <g
        className="worldMapMarks"
        // ZOOM FUNCTIONALITY WIP
        // ref={(node) => {
        //   d3.select(node).call(
        //     d3.zoom().on("zoom", function (event) {
        //       d3.select(node).attr("transform", event.transform);
        //     })
        //   );
        // }}
      >
        <path className="sphere" d={path({ type: "Sphere" })} />
        <path className="graticules" d={path(graticule())} />
        {worldGeoData.features?.map((feature) => (
          <path className="wMapFeature" d={path(feature)} />
        ))}
        {launchSiteData?.map((site) => {
          if (site.longitude !== 0 || site.latitude !== 0) {
            const [x, y] = projection([site.longitude, site.latitude]);
            let siteLaunches = null;
            let radius = 5;

            if (launchIndex[site.location_name]) {
              siteLaunches = launchIndex[site.location_name];

              radius = radius + siteLaunches.length * 1.1;

              if (radius > 30) {
                radius = 30;
              }
            } else {
              radius = 0;
            } // no launches, no dots

            return (
              <Launchsitemarks
                key={site.location_name}
                cx={x}
                cy={y}
                r={radius}
                site={site}
                launches={siteLaunches}
              />
            );
          }
          return null;
        })}
      </g>
    </>
  );
}

const mapStateToProps = (state) => ({
  worldGeoData: state.container.worldGeoData,
  locations: state.container.locations,
  launchIndex: state.container.launchIndex,
});

const WorldMapContainer = withContext(connect(mapStateToProps)(WorldMapMarks));

export default WorldMapContainer;
