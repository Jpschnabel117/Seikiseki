import React, { useState, useCallback, useEffect } from "react";
import {
  scaleLinear,
  scaleTime,
  max,
  timeFormat,
  extent,
  bin,
  timeMonths,
  sum,
} from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { connect } from "react-redux";
import { withContext } from "../../../withContext";
import localLaunchData from "../../../assets/launchtestdata.json";

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 80;
const yAxisLabelOffset = 45;

function convertLaunchArrayToGraphData(object) {
  let graphData = [];
 console.log("here",object.launchArray)
  object.launchArray.forEach((element) => {
    let d = {};
    d["Launches"] = 1;
    d["Launch Date"] = new Date(Number(element.sort_date) * 1000);
    return graphData.push(d);
  });
  console.log("graphData", graphData);

  return graphData;
}

const GraphIndex = (props) => {
  let data = convertLaunchArrayToGraphData(props.launchArray);

  const xValue = (d) => d["Launch Date"];
  const xAxisLabel = "Time";

  const yValue = (d) => d["Launches"];
  const yAxisLabel = "Launches";

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = timeFormat("%Y");

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

  return (
    <svg width={width} height={height}>
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
        </g>
    </svg>
  );
};

const mapStateToProps = (state) => ({
  launchArray: state.container.launchArray,
  isFetchingLaunches: state.container.isFetchingLaunches
});

const GraphIndexContainer = withContext(connect(mapStateToProps)(GraphIndex));

export default GraphIndexContainer;
