import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchProject, saveProjectId, fetchProjectUsers } from '../../redux/actions';
import List from '../layout/display/List' 
 
class ProjectsList extends Component {

	componentDidMount() {
		this.props.fetchProjects();
		
	}


	renderProjects = (entriesStart, maxPerPage, searchfield) => {

		// let { projects, entriesStart, maxPerPage, searchfield } = this.props;
		let { projects } = this.props;
		// let { maxPerPage, entriesStart } = this.state;
		let entriesEnd = entriesStart + maxPerPage;
		// let filter = this.state.searchfield;
		let filter = searchfield; 

		let filteredList = projects.filter(projects => {
			return projects.title.toLowerCase().includes(filter) || projects.description.toLowerCase().includes(filter)
		})

		return filteredList.slice(entriesStart, entriesEnd).map(project => {
			return (
				<div className="tableList-row projects" key={project.id}>
					<p>{project.title}</p>
					<p>{project.description}</p>
					<div className="project-action-buttons">
						<Link to="/projectassign">Manage Users</Link>
						<Link to="/projectdetails" onClick={ ()=>{
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
		let { projects } = this.props;
		
		return (
			<div>
				<List 
					listTitle="Your Projects"
					listDescription="All the projects you have in the database"
					titleGrid="tableList-titles projects"
					stateObject={projects}
					allEntries={projects.length} 
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
		entriesStart: state.pagination.receivedProps.entriesStart,
        maxPerPage: state.pagination.receivedProps.maxPerPage,
        searchfield: state.pagination.receivedProps.searchfield 
	}
}

const mapDispatchToProps = { fetchProjects, fetchProject, saveProjectId, fetchProjectUsers }; 


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList); 