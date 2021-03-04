import React from 'react';
import '../../../scss/components/navigation/SideNav.scss'; 
 
const SideNav = () => {
	return (
		<div>
			<div className="container-side-nav">
				<div className="welcome-user">
					<p>WELCOME, Admin Master</p>
				</div>
				<div className="side-nav-menu">
					<a href="/">	
						<div className="dash-home side-container" href="/">
							<div className="icon">
								<i className="fas fa-dice-d6"></i>
							</div>
							<p>Dashboard Home</p>
						</div>
					</a>
					<a href="/roleassign">
						<div className="manage-role side-container" >
							<div className="icon">
								<i className="fas fa-users-cog"></i>
							</div>
							<p>Manage Role Assigment</p>
						</div>
					</a>
					<div className="manage-project side-container">
						<div className="icon">
							<i className="fas fa-users"></i>
						</div>
						<p>Manage Project Users</p>
					</div>
					<div className="projects-home side-container">
						<div className="icon">
							<i className="fas fa-project-diagram"></i>
						</div>
						<p>My Projects</p>
					</div>
					<div className="tickets-home side-container">
						<div className="icon">
							<i className="fas fa-th-list"></i>
						</div>
						{/* <i className="fas fa-clipboard-list"></i> */}
						<p>My Tickets</p>
					</div>
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

export default SideNav;