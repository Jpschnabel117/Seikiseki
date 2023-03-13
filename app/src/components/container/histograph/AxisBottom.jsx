import React from "react";
export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 3,
}) =>
  xScale.ticks().map((tickValue) => (
    <g
      className="histo tick"
      key={tickValue}
      transform={`translate(${xScale(tickValue)},0)`}
    >
      <line className="histo graticule" y2={innerHeight} />
      <text
        className="histo"
        style={{ textAnchor: "middle" }}
        dy=".71em"
        y={innerHeight + tickOffset}
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
