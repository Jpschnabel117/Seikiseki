import React from "react";
import * as d3 from "d3";
import { connect } from 'react-redux';
import { withContext } from '../../withContext';

function WorldMapMarks(props) {
  const { worldGeoData, launchSiteData } = props;

  const projection = d3.geoEquirectangular();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  return (
    <g className="worldMapMarks">
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {worldGeoData.features?.map((feature) => (
        <path className="wMapFeature" d={path(feature)} />
      ))}
      {launchSiteData?.map((site) => {
        if (site.longitude !== 0 || site.latitude !== 0) {
          const [x, y] = projection([site.longitude, site.latitude]);
          return <circle className="site" cx={x} cy={y} r={5} />;
        }
      })}
    </g>
  );
}

const mapStateToProps = (state) => ({
  worldGeoData: state.container.worldGeoData,
});

const WorldMapContainer = withContext(connect(mapStateToProps)(WorldMapMarks));

export default WorldMapContainer;
