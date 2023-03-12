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
        store.dispatch(stateActions.toggleFetchingLaunchSites(false));
        store.dispatch(stateActions.fillLocationData({ locations }));
      });
  }

  //make this vvvv
  async get_launches(startDate, endDate) {
    store.dispatch(stateActions.toggleFetchingLaunches(true));
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ startDate, endDate }),
      redirect: "follow",
    };
    const res = fetch(`${url}/getLaunchSites`, requestOptions); //change to correct route, use start and end dates.
    res
      .then((data) => data.json())
      .then((json) => {
        const launchArray = json;
        const launchIndex = {};
        launchArray.forEach((launch) => {
          if (launch.launch_site) {
            const padLocationName = launch.launch_site;
            if (!launchIndex[padLocationName]) {
              launchIndex[padLocationName] = [];
            }
            launchIndex[padLocationName].push(launch);
          }
        });
        store.dispatch(stateActions.toggleFetchingLaunches(false));
        store.dispatch(stateActions.populateLaunchArray({ launchArray }));
        store.dispatch(stateActions.populateLaunchIndex({ launchIndex }));
      });
  }
}
export default Client;
