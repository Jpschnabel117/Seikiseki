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
  let worldGeoData = feature(worldTopoData, countries);

  /*
  add loading the launch sites
  */
  /*
  add loading the launchs
  */

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Container worldGeoData={worldGeoData} />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>

      {/* <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button> */}
    </div>
  );
}

export default App;
