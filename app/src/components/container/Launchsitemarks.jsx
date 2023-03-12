import * as d3 from "d3";
import React, { useState } from "react";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import * as stateActions from "../../redux/stateActions";
import { scaleSqrt } from "d3";

function LaunchSiteMarks(props) {
  const { cx, cy, r, site, launches } = props;
  let radius = r;

  let color = "#0000006b";
  if (launches) {
    color = "#a34a4a6b";
  }
  return (
    <>
      <circle
        className="site"
        cx={cx}
        cy={cy}
        r={radius}
        fill={color}
        onClick={() => props.togglePopup(site.location_name)}
      >
        <title>
          {site.location_name}: long:{site.longitude} lat:{site.latitude}{" "}
        </title>
      </circle>
    </>
  );
}
const mapStateToProps = (state) => ({
  popupIsOpen: state.popup.isOpen,
  site_name: state.popup.site_name,
});
const mapDispatchToProps = (dispatch) => ({
  togglePopup: (site_name) => dispatch(stateActions.togglePopup(site_name)),
});
const LaunchSiteMarksContainer = withContext(
  connect(mapStateToProps, mapDispatchToProps)(LaunchSiteMarks)
);

export default LaunchSiteMarksContainer;
