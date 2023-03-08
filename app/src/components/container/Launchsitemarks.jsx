import * as d3 from "d3";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import * as stateActions from "../../redux/stateActions";
function LaunchSiteMarks(props) {
  const { cx, cy, r, site, launches } = props;





  let number = 0;
  let color = "#0000006b";
  if (launches) {
    number = launches.length;
    color = "#a34a4a6b";
  }


  return (
    <>
      <circle className="site" fill={color} cx={cx} cy={cy} r={r} onClick={() => props.togglePopup(site.location_name)}>
        <title>
          {site.location_name}: long:{site.longitude} lat:{site.latitude} Launches: {number}
        </title>
      </circle>

    </>
  );
}
const mapStateToProps = (state) => ({
  popupIsOpen: state.popup.isOpen,
  site_name: state.popup.site_name
});
const mapDispatchToProps = (dispatch) => ({
  togglePopup: (site_name) => dispatch(stateActions.togglePopup(site_name)),
});
const LaunchSiteMarksContainer = withContext(
  connect(mapStateToProps, mapDispatchToProps)
    (LaunchSiteMarks
    ));

export default LaunchSiteMarksContainer;
