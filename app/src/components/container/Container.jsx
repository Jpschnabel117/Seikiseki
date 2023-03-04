import * as d3 from "d3";
import React, { useEffect } from "react";
import worldMap from "../../assets/wrld-bp-1-svg.svg";

function Container() {
  useEffect(() => {
    const svg = d3.select("svg");
    svg
      .append("circle")
      .attr("cx", 100)
      .attr("cy", 120)
      .attr("r", 100)
      .attr("fill", "red")
      .transition()
      .duration(1000)
      .attr("r", 1000)

  }, []);

  return (
    <div className="mapScreen">
      <img src={worldMap} className="worldMap" alt="mapsvg" />
      <svg id="sites" className="overlay">      
      </svg>
    </div>
  );
}

export default Container;
