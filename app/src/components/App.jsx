/* eslint-disable require-jsdoc */
const apiKey = import.meta.env.VITE_API_KEY;
import * as stateActions from '../redux/stateActions'
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
import Client from "../client";
import { populateLaunchIndex } from "../redux/stateActions";

const launchDataArr = localLaunchData;
// change this to launches when going to api
console.log(launchDataArr);

function convertToLaunchIndex(unformated) {
  const launchIndex = {};
  unformated.forEach((launch) => {
    if (launch.pad && launch.pad.location && launch.pad.location.name) {
      const padLocationName = launch.pad.location.name;
      if (!launchIndex[padLocationName]) {
        launchIndex[padLocationName] = [];
      }
      launchIndex[padLocationName].push(launch);
    }
  });
  return launchIndex;
}

// convertToLaunchIndex(launchDataArr)

// const launchIndexArray = Object.entries(launchIndex).map(
//   ([site, launches]) => ({
//     site,
//     launches,
//   })
// );
// should be [{launchsitename,launchesatsite[{},{}]}, etc]

function formatDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function App(props) {
  const [loadingLaunches, setLoadingLaunches] = useState(true);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${import.meta.env.VITE_API_KEY}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    async function fetchLaunchData() {
      try {
        setLoadingLaunches(true);
        const dataAsPageArray = [];

        for (let pages = 1; pages < 4; pages++) {
          try {
            const response = await fetch(
              `https://fdo.rocketlaunch.live/json/launches?after_date=${formatDate(
                props.timeLineDateStart
              )}&before_date=${formatDate(
                props.timeLineDateEnd
              )}&page=${pages}`,
              requestOptions
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const result = await response.json();
            if (pages === result.last_page) {
              break;
            }
            dataAsPageArray.push({ pages, data: result.result });
          } catch (error) {
            console.error(error);
            break;
          }
        }

        const flatarray = dataAsPageArray.flatMap((obj) => obj.data);

        props.populateLaunchIndex(convertToLaunchIndex(flatarray));
        setLoadingLaunches(false);

      } catch (error) {
        console.error(error);
      }
    }

    fetchLaunchData();
  }, [props.timeLineDateStart]);
  return (
    <div className="App">
      <Header />
      {props.fetchingLaunchSites || props.fetchingGeoData || loadingLaunches ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Container />} />
            <Route
              path="/launchdetails/:launchId"
              element={<LaunchDetailsPage />}
            />
            <Route path="/profile" element={<Profilepage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  worldMapData: state.container.worldMapData,
  worldMapSvg: state.container.worldMapSvg,
  fetchingGeoData: state.container.isFetchingWorldGeoData,
  fetchingLaunchSites: state.container.isFetchingLaunchSites,
  countries: state.container.countries,
  timeLineDateStart: state.container.timeLineDateStart,
  timeLineDateEnd: state.container.timeLineDateEnd,
  launchIndex: state.container.launchIndex,
});

const mapDispatchToProps = (dispatch) => ({
  populateLaunchIndex: (data) =>
    dispatch(stateActions.populateLaunchIndex(data)),
});

const AppContainer = withContext(
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export default AppContainer;
