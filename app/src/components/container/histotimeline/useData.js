import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import localLaunchData from '../../../assets/launchtestdata.json'


export const useData = () =>{

  const [data, setData] = useState(null);
  if(data){
console.log(data[0])
  }
  
  useEffect(() => {
    let graphData = []
for (const key in object) {
    let d = {}
    d["Launches"] = 1;
    d["Launch Date"] = new Date(Number(object.sort_date) * 1000)
    return graphData.push(d);
  };
  
    setData(localLaunchData)
  }, []);
  
  return data;
};