import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchProject, saveProjectId } from '../../redux/actions';
import '../../scss/components/lists/ProjectsList.scss';
 
 
class ProjectsList extends Component {

	state = {
		currentPage: 1,
		entriesStart: 0,
		maxPerPage: 10,
		currentEnd: this.props.projects.length,
		searchfield: ''
	}

	componentDidMount() {
		this.props.fetchProjects();
		
	}

	setEntries = (event) => {
		if (event.target.value > 0) {
			this.setState({ maxPerPage: parseInt(event.target.value) })
		}
	}

	setFilter = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	renderPagination = () => {
		let { maxPerPage } = this.state;
		let pages = this.props.projects.length / maxPerPage;
		let pagesArray = [];

		for (let i=0; i < pages; i++) {
			pagesArray.push(i)
		}

		let pageButtons = pagesArray.map(el => {
			let style;
			if ((el + 1)  === this.state.currentPage) { style = 'page-number page-selected' }
			else { style = 'page-number' }

			return <p className={style} key={el} onClick={() => this.changePage(el)}>{el + 1}</p>
		})

		return pageButtons;
	}

	changePage = (el) => {
		let { maxPerPage } = this.state;
		this.setState({
			entriesStart: el * maxPerPage,
			currentPage: el + 1 
		})
	}

	nextPage = () => {
		let currentStart = this.state.entriesStart;
		let { maxPerPage } = this.state;

		if (currentStart + maxPerPage <= this.props.projects.length - 1) {
			this.setState({ 
				entriesStart: currentStart + maxPerPage,
				currentPage: this.state.currentPage + 1 
			})
		} else {
			alert('no more entries')
		}
	}

	previousPage = () => {
		let currentStart = this.state.entriesStart;
		let { maxPerPage } = this.state;

		if (currentStart === 0) return alert('you are at the start')

		if ((currentStart - maxPerPage) < 0) {
			this.setState({ entriesStart: 0 })

		} else if (currentStart !== 0) {
			this.setState({ 
				entriesStart: currentStart - maxPerPage,
				currentPage: this.state.currentPage - 1  
			})
		} 

	}


	renderProjects() {
		let { projects } = this.props;
		let { maxPerPage, entriesStart } = this.state;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = this.state.searchfield;

		let filteredList = projects.filter(projects => {
			return projects.title.toLowerCase().includes(filter) || projects.description.toLowerCase().includes(filter)
		})

		return filteredList.slice(entriesStart, entriesEnd).map(project => {
			return (
				<div className="tableList-row" key={project.id}>
					<p>{project.title}</p>
					<p>{project.description}</p>
					<div className="project-action-buttons">
						<Link to="/projectassign">Manage Users</Link>
						<Link to="/projectdetails" onClick={ ()=>this.props.saveProjectId(project.id) }>
							Project details
						</Link>
					</div>
				</div>
			)
		})
	}

	calcCurrentEnd = () => {
		let {projects} = this.props;
		let { entriesStart, maxPerPage } = this.state;
		let end;

		if (entriesStart + maxPerPage <= projects.length) {
			end = entriesStart + maxPerPage;
		} else {
			end = projects.length;
		}
		return end;
	}


	render() {
		let { projects } = this.props;
		let { entriesStart, maxPerPage } = this.state;
		
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
									<input 
										type="number" 
										name= "entries" 
										defaultValue={maxPerPage}
										onChange={this.setEntries} 
										className="small-input"
									/>
									<p>entries</p>
								</div>
								<div className="entries-search">
									<p>Search:</p>
									<input type="search" onChange={this.setFilter}/>
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
								</div>
								<div className="tableList-footer">
									<p>Showing {entriesStart + 1} to {this.calcCurrentEnd()} of {projects.length} entries</p>
									<div className="tableList-pagination">
										<p onClick={this.previousPage}>Previous</p>
										{this.renderPagination()}
										<p onClick={this.nextPage}>Next</p>
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

const mapDispatchToProps = { fetchProjects, fetchProject, saveProjectId }; 


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList); 