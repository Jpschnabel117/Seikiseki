import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import Client from './client';
import App from './components/App';
import { createStore as createReduxStore } from 'redux';
import Context from './withContext';

import './css/index.css';

// styling file 
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createReduxStore(reducers, undefined);

Client.init({ store });
let client = new Client();

root.render(
    <Provider store={store}>
        <Context.Provider value={client}>
            <App />
        </Context.Provider>
    </Provider>,
);