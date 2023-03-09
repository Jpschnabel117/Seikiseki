const apiKey = import.meta.env.VITE_API_KEY;
import { useState, useEffect } from "react";
import "../css/App.css";
import Header from "./header/Header";
import Container from "./container/Container";
import Profilepage from "../pages/profilepage";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { withContext } from "../withContext";
import localLaunchData from "../assets/launchtestdata.json";
import LaunchDetailsPage from "../pages/launchdetailspage";

let launchDataArr = localLaunchData; // change this to launches when going to api
console.log(localLaunchData);
let launchIndex = {};
launchDataArr.forEach((launch) => {
  if (launch.pad && launch.pad.location && launch.pad.location.name) {
    const padLocationName = launch.pad.location.name;
    if (!launchIndex[padLocationName]) {
      launchIndex[padLocationName] = [];
    }
    launchIndex[padLocationName].push(launch);
  }
});
console.log("launchIndex", launchIndex);

const launchIndexArray = Object.entries(launchIndex).map(
  ([site, launches]) => ({
    site,
    launches,
  })
);
console.log("launch index as array", launchIndexArray);
// should be [{launchsitename,launchesatsite[{},{}]}, etc]

function App(props) {
  const [count, setCount] = useState(0);
  //converting world data to Geojson
  const [launchSiteData, setLaunchSiteData] = useState([]);
  const [launches, setLaunches] = useState([]);

  const [loadingSites, setLoadingSites] = useState(true);

  //CHANGE THIS BACK TO TRUE------------------------------v
  const [loadingLaunches, setLoadingLaunches] = useState(false);
  useEffect(() => {
    async function fetchSiteData() {
      try {
        setLoadingSites(true);
        const response = await fetch("http://localhost:3000/getLaunchSites");
        const data = await response.json();
        setLaunchSiteData(data);
        setLoadingSites(false);
      } catch (error) {
        console.error(error);
      }
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${apiKey}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    async function fetchLaunchData() {
      try {
        setLoadingLaunches(true);
        const response = await fetch(
          "https://fdo.rocketlaunch.live/json/launches?page=1",
          requestOptions
        );
        const data = await response.json();
        setLaunches(data);
        setLoadingLaunches(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSiteData();
    //fetchLaunchData();
  }, []);
  //console.log(launches);
  return (
    <div className="App">
      <Header />
      {loadingSites || loadingLaunches ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Container
                launchSiteData={launchSiteData}
                launchIndex={launchIndex}
              />
            }
          />
          <Route
            path="/launchdetails/:launchId"
            element={<LaunchDetailsPage />}
          />
          <Route path="/profile" element={<Profilepage />} />
        </Routes>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  worldMapData: state.container.worldMapData,
  worldMapSvg: state.container.worldMapSvg,
  fetching: state.container.isFetching,
  countries: state.container.countries,
});

const AppContainer = withContext(connect(mapStateToProps, null)(App));
export default AppContainer;
