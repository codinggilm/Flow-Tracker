import React, { Component } from 'react';
import { fetchUsers } from '../../redux/actions';
import { connect } from 'react-redux';
import '../../scss/components/lists/ProjectUsersList.scss';

 
class ProjectUsersList extends Component {

	componentDidMount = () => {
		this.props.fetchUsers();
		console.log(this.props.project)
	}

	renderProjectUsers = () => {
		// const project = this.props.project;
		return this.props.users.map(user => {
			// if (user.projectId === project.id) {
			if (user.projectId === this.props.project.id) {
				return (
					<div className="tableList-row" key={user.id}>
						<p>{user.username}</p>
						<p>{user.email}</p>
						<p>{user.role}</p>
					</div>
				)
			} else {
				return null;
			}
		})
	}
	
	render() {
		return (
			<div>
				<main className="project-users-list-main">
					<div className="list-container">
						<header className="banner-container">
							<div className="list-banner">
								<p className="list-title">Assigned Personnel</p>
								<p className="list-detail">Current Users on this Project.</p>
							</div>
						</header>
						<div className="list-search">
							<div className="list-entries">
								<div className="entries-show">
									<p>show</p>
									<input type="number" defaultValue="10" className="small-input"/>
									<p>entries</p>
								</div>
								<div className="entries-search">
									<p>Search:</p>
									<input type="search"/>
								</div>
							</div>
						</div>
						<div className="list-details-container">
						<main className="tableList-container">
								<header className="tableList-titles">
									<p>User Name</p>
									<p>Email</p>
									<p>Role</p>
								</header>
								<div className="tableList-details-container">
									{this.renderProjectUsers()}
									{/* <div className="tableList-row">
										<p>Bobby Davis</p>
										<p>bdavis@core-techs.net</p>
										<p>N/a</p>
									</div>
									<div className="tableList-row">
										<p>Bobby Davis</p>
										<p>bdavis@core-techs.net</p>
										<p>Admin</p>
									</div>
									<div className="tableList-row">
										<p>Bobby Davis</p>
										<p>bdavis@core-techs.net</p>
										<p>Developer</p>
									</div>
									<div className="tableList-row last-row">
										<p>Bobby Davis</p>
										<p>bdavis@core-techs.net</p>
										<p>Project Manager</p>
									</div> */}
								</div>
								<div className="tableList-footer">
									<p>Showing 1 to 10 of 13 entries</p>
									<div className="tableList-pagination">
										<p>Previous</p>
										<p className="page-number">1</p>
										<p className="page-number">2</p>
										<p>Next</p>
									</div>
								</div>
							</main>
						</div>
					</div>
				</main>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return { 
        users: state.users.users,
        project: state.projects.project[0]
    }
}

const mapDispatchToProps = { fetchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUsersList); 