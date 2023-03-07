import * as stateActions from "./redux/stateActions";
const url = "http://localhost:3000"
let store;
class Client {
  static init(data) {
    store = data.store;
  }
    async get_server_side_props(){
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const response = await fetch(`${url}/serverSideProps`, requestOptions)
      const { worldMapData, svg } = await response.json();
      store.dispatch(stateActions.populateWorldMapData({ worldMapData}));
      store.dispatch(stateActions.populateWorldMapSvg({svg}));
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