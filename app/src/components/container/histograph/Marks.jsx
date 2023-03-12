import React from "react";
export const Marks = ({
  binnedData,
  xScale,
  yScale,
  tooltipFormat,
  innerHeight,
}) => {
  return binnedData.map((d) => (
    <>
      {console.log(d)}
      <rect
        className="histo mark"
        x={xScale(d.x0)}
        y={yScale(d.y)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.y)}
      >
        <title>{tooltipFormat(d.x0)} launches: {d.y}</title>
      </rect>
    </>
  ));
};