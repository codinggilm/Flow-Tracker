import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, saveProjectId } from '../../redux/actions';
import '../../scss/components/lists/ProjectsList.scss';
 
 
class ProjectsList extends Component {

	componentDidMount() {
		this.props.fetchProjects();
		console.log(this.props.projects)
		
	}


	renderProjects() {
		return this.props.projects.map(project => {
			return (
				<div className="tableList-row" key={project.id}>
					<p>{project.title}</p>
					<p>{project.description}</p>
					<div className="project-action-buttons">
						<Link to="/projectassign">Manage Users</Link>
						<Link 
							to="/projectdetails" 
							onClick={()=>this.props.saveProjectId(project.id)}
						>
						Project details
						</Link>
						{/* <Link to="/projectassign">DELETE PROJECT</Link> */}
					</div>
				</div>
			)
		})
	}


	render() {
		return (
			<div>
				<main className="list-main-projects">
					<div className="list-container">
						<header className="banner-container">
							<div className="list-banner">
								<p className="list-title">Your Projects</p>
								<p className="list-detail">All the projects you have in the database.</p>
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
									<p>Project Name</p>
									<p>Description</p>
									<p>Actions</p>
								</header>
								<div className="tableList-details-container">
									{this.renderProjects()}
									{/* <div className="tableList-row">
										<p>Demo Project 2</p>
										<p>Testing PM self assign on create</p>
										<div className="project-action-buttons">
											<a href="/projectassign">Manage Users</a>
											<a href="/projectdetails">Project details</a>
										</div>
									</div>
									<div className="tableList-row">
										<p>Demo Project 2</p>
										<p>Testing PM self assign on create</p>
										<div className="project-action-buttons">
											<a href="/projectassign">Manage Users</a>
											<a href="/projectdetails">Project details</a>
										</div>
									</div>
									<div className="tableList-row">
										<p>Positive Touch</p>
										<p>Working on Cloud migration</p>
										<div className="project-action-buttons">
											<a href="/projectassign">Manage Users</a>
											<a href="/projectdetails">Project details</a>
										</div>
									</div>
									<div className="tableList-row">
										<p>Portfolio</p>
										<p>My Portfolio</p>
										<div className="project-action-buttons">
											<a href="/projectassign">Manage Users</a>
											<a href="/projectdetails">Project details</a>
										</div>
									</div>
									<div className="tableList-row last-row">
										<p>Auction Web Store</p>
										<p>An auction web app</p>
										<div className="project-action-buttons">
											<a href="/projectassign">Manage Users</a>
											<a href="/projectdetails">Project details</a>
										</div>
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
	return { projects: state.projects.projects }
}

const mapDispatchToProps = {fetchProjects, saveProjectId} 

// const mapDispatchToProps = dispatch => {
// 	return {
// 		saveProjectId: (id) => dispatch({ type: 'STORE_PROJECT_ID', payload: id })
// 	}
// } 

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList); 