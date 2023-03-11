import React from "react";
export const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map((tickValue) => (
    <g className="histo tick" transform={`translate(0,${yScale(tickValue)})`}>
      <line className="histo" x2={innerWidth} />
      <text
        className="histo"
        key={tickValue}
        style={{ textAnchor: "end" }}
        x={-tickOffset}
        dy=".32em"
      >
        {tickValue}
      </text>
    </g>
  ));
