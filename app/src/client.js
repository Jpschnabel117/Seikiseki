import * as stateActions from "./redux/stateActions";
const url = "http://localhost:3000"; // probaly put in env
let store;
class Client {
  static init(data) {
    store = data.store;
  }

  async get_server_side_props() {
    store.dispatch(stateActions.toggleFetchingWorldGeoData(true));
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const res = fetch(`${url}/serverSideProps`, requestOptions);
    res
      .then((data) => data.json())
      .then((json) => {
        const { worldMapData } = json;
        store.dispatch(stateActions.toggleFetchingWorldGeoData(false));
        
        store.dispatch(stateActions.populateWorldMapData({ worldMapData }));
      });
  }

  async get_launch_sites() {
    store.dispatch(stateActions.toggleFetchingLaunchSites(true));
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const res = fetch(`${url}/getLaunchSites`, requestOptions);
    res
      .then((data) => data.json())
      .then((json) => {
        const locations = json;
        console.log(locations);
        store.dispatch(stateActions.toggleFetchingLaunchSites(false));
        store.dispatch(stateActions.fillLocationData({ locations }));
      });
  }

  //make this vvvv
  async get_launches(startDate, endDate) {
    console.log(JSON.stringify({ startDate, endDate }));
    store.dispatch(stateActions.toggleFetchingLaunches(true));
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const res = fetch(
      `${url}/getLaunchData?startDate=${startDate}&endDate=${endDate}`,
      requestOptions
    ); //change to correct route, use start and end dates.
    res
      .then((data) => data.json())
      .then((json) => {
        console.log(json)
        const launchArray = json;
        let launchIndexNew = {};
        launchArray.forEach((launch) => {
          if (launch.launch_site) {
            const padLocationName = launch.launch_site;
            if (!launchIndexNew[padLocationName]) {
              launchIndexNew[padLocationName] = [];
            }
            launchIndexNew[padLocationName].push(launch);
          }
        });
        console.log(launchIndexNew)
        store.dispatch(stateActions.toggleFetchingLaunches(false));
        store.dispatch(stateActions.populateLaunchArray({ launchArray }));
        store.dispatch(stateActions.populateLaunchIndex( launchIndexNew ));
      });
  }
}
export default Client;
