import Worldmapmarks from "./Worldmapmarks";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import * as stateActions from "../../redux/stateActions";
import popup from "../../redux/reducers/popup";
import { Link } from "react-router-dom";

function Container(props) {
  let launchSiteData = props.launchSiteData;
  let launchIndex = props.launchIndex;
  return (
    <div className="mapScreen">
      <svg id="worldMap">
        <Worldmapmarks
          launchSiteData={launchSiteData}
          launchIndex={launchIndex}
        />
      </svg>

      {props.popupIsOpen && (
        <div className="popup">
          {props.site_name === "Kennedy Space Center" ||
          props.site_name === "Cape Canaveral SFS" ||
          props.site_name === "Cape Canaveral / KSC TBD" ? (
            <>
              <h2>{"Cape Canaveral / Kennedy Space Center"}</h2>
              {launchIndex["Cape Canaveral / KSC TBD"] ||
              launchIndex["Cape Canaveral SFS"] ||
              launchIndex["Kennedy Space Center"] ? (
                <ul>
                  {launchIndex["Cape Canaveral / KSC TBD"]?.map((launch) => (
                    <>
                      <li key={launch.id}>
                        <Link to={`/launchdetails/${launch.id}`}>
                          {launch.name}
                        </Link>
                      </li>
                    </>
                  ))}
                  {launchIndex["Cape Canaveral SFS"]?.map((launch) => (
                    <>
                      <li key={launch.id}>
                        <Link to={`/launchdetails/${launch.id}`}>
                          {launch.name}
                        </Link>
                      </li>
                    </>
                  ))}
                  {launchIndex["Kennedy Space Center"]?.map((launch) => (
                    <>
                      <li key={launch.id}>
                        <Link to={`/launchdetails/${launch.id}`}>
                          {launch.name}
                        </Link>
                      </li>
                    </>
                  ))}
                </ul>
              ) : (
                <p>No Launches in Selected Time Frame</p>
              )}
            </>
          ) : (
            <>
              <h2>{props.site_name}</h2>
              {launchIndex[props.site_name] ? (
                <ul>
                  {launchIndex[props.site_name]?.map((launch) => (
                    <>
                      <li key={launch.id}>
                        <Link to={`/launchdetails/${launch.id}`}>
                          {launch.name}
                        </Link>
                      </li>
                    </>
                  ))}
                </ul>
              ) : (
                <p>No Launches in Selected Time Frame</p>
              )}
            </>
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
  togglePopup: () => dispatch(stateActions.togglePopup(true)),
});
const ContainerContainer = withContext(
  connect(mapStateToProps, mapDispatchToProps)(Container)
);

export default ContainerContainer;
