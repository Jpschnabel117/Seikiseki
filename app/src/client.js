import * as stateActions from './redux/stateActions'


let store;
export default class Client{


    static init(data){
        store = data.store
    }
}