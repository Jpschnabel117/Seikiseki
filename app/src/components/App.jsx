import { useState, useEffect } from "react";
import "../css/App.css";
import Header from "./header/Header";
import Container from "./container/Container";
import Profilepage from "../pages/profilepage";
import { Route, Routes } from "react-router-dom";
import * as d3 from "d3";

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
    myHeaders.append(
      "Authorization",
      "Bearer f512ef1e-c1e4-4e0d-8f9e-d5adfa82ae74"
    );

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
  console.log(launches)
  //load all the launches data , call launch api for it

  return (
    <div className="App">
      <Header />
      {loadingSites || loadingLaunches ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Container launchSiteData={launchSiteData} />}
          />
          <Route path="/profile" element={<Profilepage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
