/* eslint-disable require-jsdoc */
// const apiKey = import.meta.env.VITE_API_KEY;
import * as stateActions from '../redux/stateActions';
import {useEffect} from 'react';
import '../css/App.css';
import Header from './header/Header';
import Container from './container/Container';
import Profilepage from '../pages/profilepage';
import {Route, Routes} from 'react-router-dom';
import {connect} from 'react-redux';
import {withContext} from '../withContext';
// import localLaunchData from '../assets/launchtestdata.json';
// import Client from '../client';
// import {populateLaunchIndex} from '../redux/stateActions';

// change this to launches when going to api


function App(props) {
  useEffect(() => {
    props.client.get_launches(props.timeLineDateStart, props.timeLineDateEnd);
  }, [props.timeLineDateStart, props.timeLineDateEnd]);
  return (
    <div className="App">
      <Header />
      {props.fetchingLaunchSites ||
      props.fetchingGeoData ||
      props.fetchingLaunches ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Container />} />
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
  fetchingLaunches: state.container.isFetchingLaunches,
  countries: state.container.countries,
  timeLineDateStart: state.container.timeLineDateStart,
  timeLineDateEnd: state.container.timeLineDateEnd,
  launchIndex: state.container.launchIndex,
  launchArray: state.container.launchArray,
  launchIndexBrushed: state.container.launchIndexBrushed,
});

const mapDispatchToProps = (dispatch) => ({
  populateLaunchIndex: (data) =>
    dispatch(stateActions.populateLaunchIndex(data)),
  populateLaunchArray: (data) =>
    dispatch(stateActions.populateLaunchArray(data)),
});

const AppContainer = withContext(
    connect(mapStateToProps, mapDispatchToProps)(App),
);

export default AppContainer;
