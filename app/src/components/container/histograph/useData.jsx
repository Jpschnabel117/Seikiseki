import React, { useState, useEffect } from "react";
import localLaunchData from "../../../assets/launchtestdata.json";
import { connect } from "react-redux";
import { withContext } from "../../../withContext"; 

function useData(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let graphData = [];

    localLaunchData.forEach((element) => {
      let d = {};
      d["Launches"] = 1;
      console.log(new Date(Number(element.sort_date) * 1000));
      d["Launch Date"] = new Date(Number(element.sort_date) * 1000);
      return graphData.push(d);
    });
    console.log(graphData);

    setData(graphData);
  }, []);

  return data;
}

const mapStateToProps = (state) => ({
  launchIndex: state.container.launchIndex,
});

const useDataContainer = withContext(connect(mapStateToProps)(useData));

export default useDataContainer;
