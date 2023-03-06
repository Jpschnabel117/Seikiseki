import { useState } from "react";
import "../css/App.css";
import Header from "./header/Header";
import Container from "./container/Container";
import Profilepage from "../pages/profilepage";
import { Route, Routes } from "react-router-dom";
import worldTopoData from "../assets/worldMapRawData.json";
import { feature } from "topojson-client";
import * as d3 from "d3";

function App(props) {
  const [count, setCount] = useState(0);

  //converting world data to Geojson
  const countries = worldTopoData.objects.ne_50m_admin_0_countries;
  const worldGeoData = feature(worldTopoData, countries);
  let launchSiteData;
  fetch("http://localhost:3000/getLaunches")
  .then(data => data.json()).then((response) => {
    console.log(response);
    launchSiteData = response;
  })


  /*
  add loading the launch 
  */

 console.log("loaded");
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Container worldGeoData={worldGeoData} launchSiteData={launchSiteData}/>} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>
    </div>
  );
}

export default App;
