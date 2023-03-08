import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import Launchsitemarks from "./Launchsitemarks";
import { Link } from "react-router-dom";

function WorldMapMarks(props) {
  const { worldGeoData, launchSiteData } = props;
  let launchIndex = props.launchIndex;

  const projection = d3.geoEquirectangular();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  //sizing the launch sites by launches in time

  //---------------------------------------------------------------

  return (
    <>
      <g
        className="worldMapMarks"
        //ZOOM FUNCTIONALITY WIP
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
              console.log(siteLaunches);
              radius = radius + siteLaunches.length * 1.2;
              if (
                site.location_name === "Cape Canaveral / KSC TBD" ||
                site.location_name === "Cape Canaveral SFS" ||
                site.location_name === "Kennedy Space Center"
              ) {
                radius =
                  radius +
                  (launchIndex["Cape Canaveral / KSC TBD"].length +
                    launchIndex["Cape Canaveral SFS"].length +
                    launchIndex["Kennedy Space Center"].length) *
                    1.2;
              }
              if (radius > 15) {
                radius = 20;
              }
            } else {
              radius = 0;
            } //no launches, no dots

            return (
              <Launchsitemarks
                key={site.name}
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
});

const WorldMapContainer = withContext(connect(mapStateToProps)(WorldMapMarks));

export default WorldMapContainer;
