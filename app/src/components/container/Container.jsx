import Worldmapmarks from "./Worldmapmarks";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import * as stateActions from "../../redux/stateActions";
import popup from "../../redux/reducers/popup";



function Container(props) {
  let launchSiteData = props.launchSiteData;
  let launchData = props.launchData;
  return (
    <div className="mapScreen">
      <svg id="worldMap">
        <Worldmapmarks
          launchSiteData={launchSiteData}
          launchData={launchData}
        />
      </svg>

      {props.popupIsOpen && (
        <div className="popup">
          <h2>{props.site_name}</h2>
          {launchData[props.site_name] ? (
            <ul>
              {launchData[props.site_name]?.map((launch) => (
                <li key={launch.id}>{launch.name}</li>
              ))}
            </ul>
          ) : (
            <p>No Launches in Selected Time Frame</p>
          )}
          <button onClick={() => props.togglePopup()}>Close</button>
        </div>
      )}
    </div>
  );

}


const mapStateToProps = (state) => ({
  worldGeoData: state.container.worldGeoData,
  popupIsOpen: state.popup.isOpen,
  site_name: state.popup.site_name,
});
const mapDispatchToProps = (dispatch) => ({
  togglePopup: () => dispatch(stateActions.togglePopup(true))
});
const ContainerContainer = withContext(connect(mapStateToProps, mapDispatchToProps)(Container));

export default ContainerContainer;
