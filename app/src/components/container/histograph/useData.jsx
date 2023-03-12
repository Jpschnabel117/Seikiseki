import React, { useState, useEffect } from "react";
import localLaunchData from "../../../assets/launchtestdata.json";



export const useData = (launches) => {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("yoyo");
    let graphData = [];

    localLaunchData.forEach((element) => {
      let d = {};
      d["Launches"] = 1;
      console.log(new Date(Number(element.sort_date) * 1000));
      d["Launch Date"] = new Date(Number(element.sort_date) * 1000);
      return graphData.push(d);
    });
    console.log("graphData",graphData);

    setData(graphData);
  }, []);

  return data;
}


