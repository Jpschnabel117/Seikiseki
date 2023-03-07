import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import LaunchPopUp from "./launchPopUp";

function WorldMapMarks(props) {
  const { worldGeoData, launchSiteData } = props;
  let launchData = props.launchData;

  const projection = d3.geoEquirectangular();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  //put in seperate component Launchsitemarks--
  function LaunchSite({ cx, cy, r, site, launches }) {
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
        <h1>{showPopup} hello</h1>
        {showPopup ? (
          <div className="launchPop">
            <button onClick={togglePopup}>Close Popup</button>
            <LaunchPopUp site={site} launches={launches} />
          </div>
        ) : null}
      </>
    );
  }

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
            let siteLaunches = null
            if(launchData[site.location_name]){
              siteLaunches = launchData[site.location_name];
              console.log(siteLaunches)
            }//check null
            
            return (
              <LaunchSite
                key={site.name}
                cx={x}
                cy={y}
                r={5}
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
