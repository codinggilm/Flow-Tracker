import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
// import { Auth0Provider } from "@auth0/auth0-react";
import rootReducer from './redux/reducers';
import App from './App';
import './scss/App.scss';

// const jwt = require('jsonwebtoken');
// const hashAlgorithm = (s) => "THIS" + s + "SECURE";

const saveStateToLocalStorage = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		console.log(err)
	}
}

const loadStateFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) return undefined
		return JSON.parse(serializedState)
	} catch (err) {
		console.log(err)
		return undefined
	}
}

const persistedState = loadStateFromLocalStorage()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	rootReducer,
	persistedState, 
	composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => saveStateToLocalStorage(store.getState()))

 
ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	,
  	document.getElementById('root')
);
