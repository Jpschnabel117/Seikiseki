import * as stateActions from "./redux/stateActions";

let store;
export default class Client {
  static init(data) {
    store = data.store;
  }

  
  async sendRequest(options,url="http://localhost:3000/") {
    const response = await fetch(url, options);
    return response.json();
  }

}
