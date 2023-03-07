import * as stateActions from "./redux/stateActions";
const url = "http://localhost:3000"
let store;
class Client {
  static init(data) {
    store = data.store;
  }
    async get_server_side_props(){
      store.dispatch(stateActions.toggleFetching(true));
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      const res = fetch(`${url}/serverSideProps`, requestOptions)
      res.then((data) => data.json()).then((json) => {
        const { worldMapData, worldMapSvg } = json;
        console.log(worldMapData)
        store.dispatch(stateActions.toggleFetching(false));
        store.dispatch(stateActions.populateWorldMapData({worldMapData}));
        store.dispatch(stateActions.populateWorldMapSvg({worldMapSvg}));

      }) 
      
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