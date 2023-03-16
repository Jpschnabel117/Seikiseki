import React, {useEffect, useState, useRef} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';
import {withContext} from '../../withContext';
import Launchsitemarks from './Launchsitemarks';
import {Link} from 'react-router-dom';
import WorldFeaturesMemoized from './worldFeaturesMemoized';

function WorldMapMarks(props) {
  const {worldGeoData, locations, launchIndex, brushCheck} = props;
  const launchSiteData = locations;

  const projection = d3.geoNaturalEarth1();
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
        <path className="sphere" d={path({type: 'Sphere'})} />
        <path className="graticules" d={path(graticule())} />
        <WorldFeaturesMemoized worldGeoData={worldGeoData} path={path}/>
        {launchSiteData?.map((site) => {
          if (site.longitude !== 0 || site.latitude !== 0) {
            const [x, y] = projection([site.longitude, site.latitude]);
            let siteLaunches = null;
            let radius = 5;

            if (launchIndex[site.location_name]) {
              const reduce = brushCheck(
                  launchIndex[site.location_name],
                  props.brushExtent[0],
                  props.brushExtent[1],
              );

              siteLaunches = launchIndex[site.location_name];
              if (siteLaunches.length - reduce === 0) {
                radius = 0;
              } else {
                radius = radius + (siteLaunches.length - reduce) * 1.1;
              }

              if (radius > 50) {
                radius = 50; // make good scale
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
                brushCheck={brushCheck}
                brushExtent={props.brushExtent}
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
  brushTimeStart: state.container.brushTimeStart,
  brushTimeEnd: state.container.brushTimeEnd,
});

const WorldMapContainer = withContext(connect(mapStateToProps)(WorldMapMarks));

export default WorldMapContainer;
