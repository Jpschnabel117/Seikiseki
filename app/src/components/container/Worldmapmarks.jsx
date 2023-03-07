import * as d3 from "d3";
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { withContext } from '../../withContext';

function Worldmapmarks(props) {
  let worldData = props.worldGeoData;
  let launchSiteData = props.launchSiteData;
  const zoom = d3.zoom();

  const projection = d3.geoEquirectangular(); //change projections here
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  return (<>
    {
      !worldData.features ?
        <p> loading </p>
        :

        <g className="worldMapMarks">
          <path className="sphere" d={path({ type: "Sphere" })} />
          <path className="graticules" d={path(graticule())} />
          {worldData.features.map((feature) => (
            <path className="wMapFeature" d={path(feature)} />
          ))}
          {launchSiteData.map((site) => {
            if (site.longitude !== 0 || site.latitude !== 0) {
              const [x, y] = projection([site.longitude, site.latitude]);
              return <circle className="site" cx={x} cy={y} r={5} />;
            }
          })}
        </g>


    }


  </>
  );
}
const mapStateToProps = (state) => ({
  worldMapData: state.container.worldMapData,
  worldMapSvg: state.container.worldMapSvg,
  countries: state.container.countries,
  worldGeoData: state.container.worldGeoData,
  fetching: state.container.isFetching,
});

const WorldMapContainer = withContext(connect(mapStateToProps, null)(Worldmapmarks));
export default WorldMapContainer;