import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../../scss/components/navigation/SideNav.scss'; 
 
class SideNav extends Component {

	render() {
		const { currentUser } = this.props;
		return (
			<div>
				<div className="container-side-nav">
					<div className="welcome-user">
						<p>Welcome, {currentUser.username}</p>
					</div>
					<div className="side-nav-menu">
						<Link to="/">	
							<div className="dash-home side-container" href="/">
								<div className="icon">
									<i className="fas fa-dice-d6"></i>
								</div>
								<p>Dashboard</p>
							</div>
						</Link>
						<Link to="/role-assign">
							<div className="manage-role side-container" >
								<div className="icon">
									<i className="fas fa-users-cog"></i>
								</div>
								<p>Manage Role Assigment</p>
							</div>
						</Link>
						<Link to="/projectassign">
							<div className="manage-project side-container">
								<div className="icon">
									<i className="fas fa-users"></i>
								</div>
								<p>Manage Project Users</p>
							</div>
						</Link>
						<Link to="/projects">
							<div className="projects-home side-container">
								<div className="icon">
									<i className="fas fa-project-diagram"></i>
								</div>
								<p>My Projects</p>
							</div>
						</Link>
						<Link to="/tickets">
						<div className="tickets-home side-container">
							<div className="icon">
								<i className="fas fa-th-list"></i>
							</div>
							<p>My Tickets</p>
						</div>
						</Link>
						<div className="user-home side-container">
							<div className="icon">
								<i className="fas fa-user"></i>
							</div>
							<p>User Profile</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		currentUser: state.auth.currentUser,
	}
}

// const mapDispatchToProps = { fetchTickets }

export default connect(mapStateToProps, null)(SideNav); 