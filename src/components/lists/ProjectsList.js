import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchUserProjects, fetchProject, saveProjectId, fetchProjectUsers } from '../../redux/actions';
import List from '../layout/display/List' 
 
class ProjectsList extends Component {

	componentDidMount() {
		const { currentUser } = this.props;
		
		this.props.fetchProjects(currentUser.companyId);
		if (currentUser.role !== 'Admin') {
			this.props.fetchUserProjects(currentUser.id)
		} 
		// else {
		// 	this.props.fetchProjects(currentUser.companyId);
		// }
		// this.props.fetchProjects(currentUser.companyId);
	}


	renderProjects = (entriesStart, maxPerPage, searchfield) => {
		let { projects, currentUser, userProjects } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;
		let currentUserProjects = [];
		let filteredList;
		let lastRow; 


		for (let i=0;  i < projects.length; i++) {
			for (let v=0; v < userProjects.length; v++) {
				if (projects[i].id === userProjects[v].projectID) {
					currentUserProjects.push(projects[i]);
				}
			}
		};

		if (currentUser.role !== 'Admin') {
			filteredList = currentUserProjects.filter(projects => {
				return projects.title.toLowerCase().includes(filter) || projects.description.toLowerCase().includes(filter)
			})
		} else {
			filteredList = projects.filter(projects => {
				return projects.title.toLowerCase().includes(filter) || projects.description.toLowerCase().includes(filter)
			})
		}

		// const checkLastRow = () => {
		// 	for (let i=0; i < filteredList.length; i++) {
		// 		if (i === (maxPerPage - 1) || i === filteredList.length) {
		// 			return lastRow = true;
		// 		}
		// 		console.log(i, maxPerPage)
		// 	}

		// } 
		
		// checkLastRow();
		
		// const rowStyle = lastRow ? 'tableList-row projects last-row ' : 'tableList-row projects'


		return filteredList.slice(entriesStart, entriesEnd).map(project => {

			return (
				// <div className={rowStyle} key={project.id}>
				<div className='tableList-row projects' key={project.id}>
					<p>{project.title}</p>
					<p>{project.description}</p>
					<div className="project-action-buttons">
						<Link to="/projectassign" className="main-links">Manage Users</Link>
						<Link to="/projectdetails" className="main-links" onClick={ ()=>{
							this.props.fetchProjectUsers(project.id);
							this.props.saveProjectId(project.id);
						}}>
							Project details
						</Link>
					</div> 
				</div>
			)
		})
	}



	render() {
		let { projects, userProjects, currentUser } = this.props;
		let currentUserProjects;
		
		if (currentUser.role !== 'Admin') {
			currentUserProjects = userProjects;
		} else {
			currentUserProjects = projects;
		}
	
		return (
			<div>
				<List 
					listTitle="Your Projects"
					listDescription="All the projects you have in the database"
					titleGrid="tableList-titles projects"
					stateObject={currentUserProjects}
					allEntries={currentUserProjects.length} 
					renderItems={(entriesStart, maxPerPage, searchfield) => 
						this.renderProjects(entriesStart, maxPerPage, searchfield)
					} 
				>
					<p>Project Name</p>
					<p>Description</p>
					<p>Actions</p>
				</List>
			</div>
		)
	}
}
   
const mapStateToProps = state => {
	return { 
		projects: state.projects.projects,
		userProjects: state.projects.userProjects,
		entriesStart: state.pagination.receivedProps.entriesStart,
        maxPerPage: state.pagination.receivedProps.maxPerPage,
        searchfield: state.pagination.receivedProps.searchfield,
		currentUser: state.auth.currentUser 
	}
}

const mapDispatchToProps = { fetchProjects, fetchUserProjects, fetchProject, saveProjectId, fetchProjectUsers }; 


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList); 