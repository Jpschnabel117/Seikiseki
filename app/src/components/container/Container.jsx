import Worldmapmarks from "./Worldmapmarks";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import * as stateActions from "../../redux/stateActions";
import popup from "../../redux/reducers/popup";
import { Link } from "react-router-dom";

function Container(props) {
  let launchSiteData = props.launchSiteData;
  let launchIndex = props.launchIndex;

  function findUrl(slug) {
    const url = slug.match(/https?:\/\/[^\s]+/)[0];
    return url;
  }

  function launchStatus(value) {
    let result;

    switch (value) {
      case -1:
        result = "Not Set";
        break;
      case 0:
        result = "Failure";
        break;
      case 1:
        result = "Success";
        break;
      case 2:
        result = "Partial Failure";
        break;
      case 3:
        result = "In-Flight Abort";
        break;
      default:
        result = "Invalid value";
        break;
    }

    return result;
  }

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
              <div className="popHead">
                <h2> {"Cape Canaveral / Kennedy Space Center"}</h2>
                <div>
                  <button onClick={() => props.togglePopup()}>Close</button>
                </div>
              </div>
              <div className="popBody">
                {launchIndex["Cape Canaveral / KSC TBD"] ||
                launchIndex["Cape Canaveral SFS"] ||
                launchIndex["Kennedy Space Center"] ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Provider</th>
                        <th>Mission</th>
                        <th>Vehicle</th>
                        <th>Date</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <>
                        {console.log("oh no")}
                        {launchIndex["Cape Canaveral SFS"]?.map((launch) => (
                          <tr>
                            <td>{launch.provider.name}</td>
                            <td className="linkTd">
                              <a
                                target="_blank"
                                href={findUrl(launch.quicktext)}
                              >
                                {launch.name}
                              </a>
                              {/* <Link to={`/launchdetails/${launch.id}`}>
                                {launch.name}
                              </Link> */}
                            </td>
                            <td>{launch.vehicle.name}</td>
                            <td>{launch.date_str}</td>
                            <td>{launchStatus(launch.result)}</td>
                          </tr>
                        ))}
                        {launchIndex["Cape Canaveral / KSC TBD"]?.map(
                          (launch) => (
                            <tr>
                              <td>{launch.provider.name}</td>
                              <td className="linkTd">
                                <a
                                  target="_blank"
                                  href={findUrl(launch.quicktext)}
                                >
                                  {launch.name}
                                </a>
                                {/* <Link to={`/launchdetails/${launch.id}`}>
                                  {launch.name}
                                </Link> */}
                              </td>
                              <td>{launch.vehicle.name}</td>
                              <td>{launch.date_str}</td>
                              <td>{launchStatus(launch.result)}</td>
                            </tr>
                          )
                        )}
                        {launchIndex["Kennedy Space Center"]?.map((launch) => (
                          <tr>
                            <td>{launch.provider.name}</td>
                            <td className="linkTd">
                              <a
                                target="_blank"
                                href={findUrl(launch.quicktext)}
                              >
                                {launch.name}
                              </a>
                              {/* <Link to={`/launchdetails/${launch.id}`}>
                                {launch.name}
                              </Link> */}
                            </td>
                            <td>{launch.vehicle.name}</td>
                            <td>{launch.date_str}</td>
                            <td>{launchStatus(launch.result)}</td>
                          </tr>
                        ))}
                      </>
                    </tbody>
                  </table>
                ) : (
                  <p>No Launches in Selected Time Frame</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="popHead">
                <h2>{props.site_name}</h2>
                <div>
                  <button onClick={() => props.togglePopup()}>Close</button>
                </div>
              </div>
              <div className="popBody">
                {launchIndex[props.site_name] ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Provider</th>
                        <th>Mission</th>
                        <th>Vehicle</th>
                        <th>Date</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {launchIndex[props.site_name]?.map((launch) => (
                        <tr>
                          <td>{launch.provider.name}</td>
                          <td className="linkTd">
                            <a target="_blank" href={findUrl(launch.quicktext)}>
                              {launch.name}
                            </a>
                            {/* <Link to={`/launchdetails/${launch.id}`}>
                              {launch.name}
                            </Link> */}
                          </td>
                          <td>{launch.vehicle.name}</td>
                          <td>{launch.date_str}</td>
                          <td>{launchStatus(launch.result)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No Launches in Selected Time Frame</p>
                )}
              </div>
            </>
          )}
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
