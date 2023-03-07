import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import Launchsitemarks from "./Launchsitemarks";

function WorldMapMarks(props) {
  const { worldGeoData, launchSiteData } = props;
  let launchData = props.launchData;

  const projection = d3.geoEquirectangular();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();


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
            let radius = 5
            if (launchData[site.location_name]) {
              siteLaunches = launchData[site.location_name];
              console.log(siteLaunches)
              radius = radius + siteLaunches.length*2
            } //check null

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
