import * as stateActions from "./redux/stateActions";
const url = "http://localhost:3000" //probaly put in env
let store;
class Client {
  static init(data) {
    store = data.store;
  }
  async get_server_side_props() {
    store.dispatch(stateActions.toggleFetchingWorldGeoData(true));
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const res = fetch(`${url}/serverSideProps`, requestOptions);
    res
      .then((data) => data.json())
      .then((json) => {
        const { worldMapData, worldMapSvg } = json;
        console.log(worldMapData);
        store.dispatch(stateActions.toggleFetchingWorldGeoData(false));
        store.dispatch(stateActions.populateWorldMapData({ worldMapData }));
      });
  }

  async get_launch_sites() {
    store.dispatch(stateActions.toggleFetchingLaunchSites(true));
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const res = fetch(`${url}/getLaunchSites`, requestOptions);
    res
      .then((data) => data.json())
      .then((json) => {
        const locations = json;
        store.dispatch(stateActions.toggleFetchingLaunchSites(false));
        store.dispatch(stateActions.fillLocationData( {locations} ));
      });
  }
}
export default Client; 






//  async function run(){

//   async sendRequest(options,url="http://localhost:3000/") {
//     const response = await fetch(url, options);
//     storeResults(response.json());
//   }

//   /**
//     * @param  {Object} payload //Contains the results of a search
//     */
//     async storeResults(payload){
//         store.dispatch(stateActions.searchResults(payload)) 
//     }


//  }