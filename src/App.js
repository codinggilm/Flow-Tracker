import React from 'react';
import { Route } from 'react-router-dom';
import './scss/App.scss';
import TopNav from './components/navigation/TopNav/TopNav';
import SideNav from './components/navigation/SideNav/SideNav';
import Dashboard from './containers/Dashboard/Dashboard';
import Projects from './containers/Projects/Projects';
import ProjectDetails from './containers/Projects/ProjectDetails';
import RoleAssign from './containers/RoleAssign/RoleAssign';
import TicketDetails from './containers/TicketDetails/TicketDetails';

const App = () => {
	return (
		<div>
			<main>
				<TopNav />
				<SideNav />
				<div className="main-content">
					<Route path="/" exact component={Dashboard} />
					<Route path="/roleassign" component={RoleAssign} />
					<Route path="/projects" component={Projects} />
					<Route path="/projectdetails" component={ProjectDetails} />
					<Route path="/tickedetails" component={TicketDetails} />
				</div>
			</main>
		</div>
	)
}

export default App;
