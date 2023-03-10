
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import reducers from './redux/reducers';
import Client from './client';
import App from './components/App';
import {createStore as createReduxStore} from 'redux';
import Context from './withContext';
import {BrowserRouter} from 'react-router-dom';

import './css/index.css';
// styling file
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createReduxStore(reducers, undefined);

Client.init({store});
const client = new Client();
client.get_server_side_props();
client.get_launch_sites();
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <Context.Provider value={client}>
          <App />
        </Context.Provider>
      </Provider>
    </BrowserRouter>,
);


