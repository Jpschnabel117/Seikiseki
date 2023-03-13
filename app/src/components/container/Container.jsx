import Worldmapmarks from "./Worldmapmarks";
import { connect } from "react-redux";
import { withContext } from "../../withContext";
import * as stateActions from "../../redux/stateActions";
import popup from "../../redux/reducers/popup";
import { Link } from "react-router-dom";
import GraphIndex from "./histograph/graphindex";
import { useState } from "react";

function Container(props) {
  const width = 960;
  const height = 500;
  const dateHistogramSize = 0.2;
  const launchIndex = props.launchIndex;
  const [brushExtent, setBrushExtent] = useState([]);

  function brushCheck(array, start, end) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
      const sortDate = array[i].sort_date;

      if (sortDate < start || sortDate > end) {
        counter++;
      }
    }
    return counter;
  }

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

  function handleDateRangeChange(value) {
    const dateRange = value.split(",").map(Number);
    props.changeDateRange(dateRange);
  }

  return (
    <div className="mapScreen">
      <span className="copyright">Data by RocketLaunch.Live</span>

      <svg width={width} height={height} id="worldMap">
        <Worldmapmarks
          width={width}
          height={height}
          brushExtent={brushExtent}
          brushCheck={brushCheck}
        />
        <g transform={`translate(0,${height - dateHistogramSize * height})`}>
          <GraphIndex
            height={dateHistogramSize * height}
            width={width}
            setBrushExtent={setBrushExtent}
          />
        </g>
      </svg>

      {props.popupIsOpen && (
        <div className="popup">
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
                    <>
                      {launch.sort_date < brushExtent[0] || launch.sort_date > brushExtent[1] ? (
                        <></>
                      ) : (
                        <tr>
                          <td>{launch.prov}</td>
                          <td className="linkTd">
                            <a
                              target="_blank"
                              href={findUrl(launch.quicktext)}
                              rel="noreferrer"
                            >
                              {launch.launch_name}
                            </a>
                            {/* <Link to={`/launchdetails/${launch.id}`}>
                              {launch.name}
                            </Link> */}
                          </td>
                          <td>{launch.vehicle}</td>
                          <td>{launch.date_str}</td>
                          <td>{launchStatus(launch.result)}</td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No Launches in Selected Time Frame</p>
            )}
          </div>
        </div>
      )}
      <div className="dateRangeSelect">
        {/*fix this later*/}
        {/* <select onChange={(event) => handleDateRangeChange(event.target.value)}>
          <option value="-220906800,410245200">1963-1984</option>
          <option value="410245201,1072933200">1984-2004</option>
          <option value="1072933201,4102452000">2004+</option>
        </select> */}
        <button onClick={() => props.changeDateRange([-220906800, 410245200])}>
          1963-1982
        </button>
        <button onClick={() => props.changeDateRange([410245201, 1072933200])}>
          1982-2004
        </button>
        <button onClick={() => props.changeDateRange([1072933201, 4102452000])}>
          2004+
        </button>
      </div>
      <div></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  worldGeoData: state.container.worldGeoData,
  popupIsOpen: state.popup.isOpen,
  site_name: state.popup.site_name,
  timeLineDateStart: state.container.timeLineDateStart,
  timeLineDateEnd: state.container.timeLineDateEnd,
  launchIndex: state.container.launchIndex,
});
const mapDispatchToProps = (dispatch) => ({
  togglePopup: () => dispatch(stateActions.togglePopup(true)),
  changeDateRange: (data) => dispatch(stateActions.changeDateRange(data)),
});
const ContainerContainer = withContext(
  connect(mapStateToProps, mapDispatchToProps)(Container)
);

export default ContainerContainer;
