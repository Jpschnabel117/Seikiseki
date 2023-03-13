import React from "react";
import { timeFormat } from "d3";
export const Marks = ({ binnedData, xScale, yScale, innerHeight }) => {
  const tooltipFormat = timeFormat("%b %Y: ");
  return binnedData.map((d) => (
    <>
      <rect
        className="histo mark"
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>
          {tooltipFormat(d.x0)} launches: {d.y}
        </title>
      </rect>
    </>
  ));
};
