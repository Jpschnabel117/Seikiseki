import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { connect } from 'react-redux';
import { withContext } from '../../withContext';
import { launchPopUp } from "./launchPopUp";

function WorldMapMarks(props) {
  const { worldGeoData, launchSiteData } = props;
  let launchData = props.launchData;

  const projection = d3.geoEquirectangular();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();


  function LaunchSite({ cx, cy, r, popup, site, launches }) {
    const ref = useRef();
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
      console.log("hello");
    };

    useEffect(() => {
      const circle = d3.select(ref.current);
      circle.on("click", togglePopup);
    }, []);

    return (
      <>
        <circle className="site" ref={ref} cx={cx} cy={cy} r={r}>
          <title>{site.location_name}</title>
        </circle>
        {showPopup ? (
          <div className="launchPop">
            <button onClick={togglePopup}>Close Popup</button>
            <launchPopUp site={site} launches={launches} />
          </div>
        ) : null}
      </>
    );
  }

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
          return (
            <>
              <LaunchSite
                key={site.name}
                cx={x}
                cy={y}
                r={5}
                site={site}
                launches={launchData}
              />
            </>
          );
        }
        return null;
      })}
    </g>
  );
}

const mapStateToProps = (state) => ({
  worldGeoData: state.container.worldGeoData,
});

const WorldMapContainer = withContext(connect(mapStateToProps)(WorldMapMarks));

export default WorldMapContainer;
