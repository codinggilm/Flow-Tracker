import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
// import { Auth0Provider } from "@auth0/auth0-react";

import reducers from './redux/reducers';
import App from './App';
import './scss/App.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers, 
	composeEnhancers(applyMiddleware(reduxThunk)));

 
ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	,
  	document.getElementById('root')
);
