import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './scss/App.scss';
import TopNav from './components/navigation/TopNav/TopNav';
import SideNav from './components/navigation/SideNav/SideNav';
import Dashboard from './containers/Dashboard/Dashboard';
import RoleAssign from './containers/RoleAssign/RoleAssign';
import ProjectAssign from './containers/ProjectAssign/ProjectAssign';
import Projects from './containers/Projects/Projects';
import ProjectDetails from './containers/Projects/ProjectDetails';
import CreateProject from './containers/Projects/CreateProject';
import EditProject from './containers/Projects/EditProject';
import Tickets from './containers/Tickets/Tickets';
import TicketDetails from './containers/Tickets/TicketDetails';
import CreateTicket from './containers/Tickets/CreateTicket';
import EditTicket from './containers/Tickets/EditTicket'; 

class MainApp extends Component {



	render() {
		return (
			<div>
                <main>
                    <TopNav />
                    <SideNav />
                    <div className="main-content">
                        {/* <Route path="/login" exact component={Auth} /> */}
                        <Route path="/dashboard" component={Dashboard} />
                        {/* <Route path="/" exact render={() => <Dashboard />} /> */}
                        {/* <Route path="/" exact render={() => <Dashboard />} /> */}
                        <Route path="/roleassign" component={RoleAssign} />
                        <Route path="/projectassign" component={ProjectAssign} />
                        <Route path="/projects" component={Projects} />
                        <Route path="/projectdetails" component={ProjectDetails} />
                        <Route path="/editproject" component={EditProject} />
                        <Route path="/createproject" component={CreateProject} />
                        <Route path="/tickets" component={Tickets} />
                        <Route path="/ticketdetails" component={TicketDetails} />
                        <Route path="/createticket" component={CreateTicket} />
                        <Route path="/editticket" component={EditTicket} />
                    </div>
                </main>
			</div>
		)
	} 
}

export default MainApp;
