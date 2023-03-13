import React, { useRef, useEffect } from "react";
import * as stateActions from "../../../redux/stateActions"
import {
  select,
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
  brushX,
  selection,
} from "d3";
import * as d3 from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { connect } from "react-redux";
import { withContext } from "../../../withContext";
import localLaunchData from "../../../assets/launchtestdata.json";

const width = 960;
const height = 500;
const margin = { top: 0, right: 30, bottom: 20, left: 60 };
const xAxisLabelOffset = 54;
const yAxisLabelOffset = 30;
const xAxisTickFormat = timeFormat("%Y");
function convertLaunchArrayToGraphData(object) {
  let graphData = [];
  console.log("here", object.launchArray);
  object.launchArray.forEach((element) => {
    let d = {};
    d["Launches"] = 1;
    d["Launch Date"] = new Date(Number(element.sort_date) * 1000);
    return graphData.push(d);
  });

  return graphData;
}

function dateToUnixTimestamp(dateString) {
  const date = new Date(dateString);
  const timestampInSeconds = Math.floor(date.getTime() / 1000);
  return timestampInSeconds;
}
let timestamps;

const GraphIndex = (props) => {
  const brushRef = useRef();
  const width = 960;
  let data = convertLaunchArrayToGraphData(props.launchArray);
  const xValue = (d) => d["Launch Date"];
  const xAxisLabel = "Time";

  const yValue = (d) => d["Launches"];
  const yAxisLabel = "Launches";

  const innerHeight = props.height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (d) => d.y)])
    .range([innerHeight, 0]);

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", (event) => {
      let dates = event.selection.map(xScale.invert);
      timestamps = dates.map((date) => Math.floor(date.getTime() / 1000));
      props.setBrushExtent(timestamps)
      //props.changeBrushRange(timestamps);
    });
  }, [innerWidth, innerHeight]);
  return (
    <>
      <rect width={width} height={height} fill="#f9f9f9"></rect>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text
          className="histo axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text
          className="histo axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <Marks
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          innerHeight={innerHeight}
        />
        <g ref={brushRef} />
      </g>
    </>
  );
};

const mapStateToProps = (state) => ({
  launchArray: state.container.launchArray,
  isFetchingLaunches: state.container.isFetchingLaunches,
  brushTimeStart: state.container.brushTimeStart,
  brushTimeEnd: state.container.brushTimeEnd,
  launchIndexBrushed: state.container.launchIndexBrushed,
});
const mapDispatchToProps = (dispatch) => ({
  populateLaunchIndexBrushed: (data) =>
    dispatch(stateActions.populateLaunchIndexBrushed(data)),
  changeBrushRange: (data) => dispatch(stateActions.changeBrushRange(data)),
});
const GraphIndexContainer = withContext(
  connect(mapStateToProps, mapDispatchToProps)(GraphIndex)
);

export default GraphIndexContainer;
