import * as stateActions from "./redux/stateActions";

let store;
export default class Client {
  static init(data) {
    store = data.store;
  }

  
  async sendRequest(options,url="http://localhost:3000/") {
    const response = await fetch(url, options);
    storeResults(response.json());
  }

  /**
    * @param  {Object} payload //Contains the results of a search
    */
    async storeResults(payload){
        store.dispatch(stateActions.searchResults(payload)) 
    }
}
