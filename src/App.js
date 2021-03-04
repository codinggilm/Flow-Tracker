import React from 'react';
import { Route } from 'react-router-dom';
import './scss/App.scss';
import TopNav from './components/navigation/TopNav/TopNav';
import SideNav from './components/navigation/SideNav/SideNav';
import Dashboard from './containers/Dashboard/Dashboard';
import RoleAssign from './containers/RoleAssign/RoleAssign';

const App = () => {
	return (
		<div>
			<main>
				<TopNav />
				<SideNav />
				<div className="main-content">
					<Route path="/" exact component={Dashboard} />
					<Route path="/roleassign" component={RoleAssign} />
				</div>
			</main>
		</div>
	)
}

export default App;
