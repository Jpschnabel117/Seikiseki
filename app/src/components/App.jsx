import { useState, useEffect } from "react";
import "../css/App.css";
import Header from "./header/Header";
import Container from "./container/Container";
import Profilepage from "../pages/profilepage";
import { Route, Routes } from "react-router-dom";
import * as d3 from "d3";
import { connect } from 'react-redux';
import { withContext } from '../withContext';


function App(props) {
  const [count, setCount] = useState(0);
  //converting world data to Geojson
  const [launchSiteData, setLaunchSiteData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/getLaunchSites");
        const data = await response.json();
        setLaunchSiteData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  console.log(launchSiteData);

  console.log("loaded");
  return (
    <div className="App">
      <Header />
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Container
                launchSiteData={launchSiteData}
              />
            }
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
  countries: state.container.countries
});

const AppContainer = withContext(connect(mapStateToProps, null)(App));
export default AppContainer;
