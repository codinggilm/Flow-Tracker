import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import { Auth0Provider } from "@auth0/auth0-react";
import './scss/App.scss';
 
ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	,
  	document.getElementById('root')
);
