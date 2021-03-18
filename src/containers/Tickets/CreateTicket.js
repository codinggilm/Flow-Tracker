import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createTicket } from '../../redux/actions';
// import { createTicket, fetchProjects } from '../../redux/actions';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/CreateTicket.scss';

    
class CreateTicket extends Component {
    state = {
        title: '',
        description: '',
        comment: '',
        project: this.props.projects[0].title,
        projectId: this.props.projects[0].id,
        developer: '',
        priority: 'none',
        type: 'Bugs/Errors',
        status: 'Open',
        submitter: 'admin'
    }  

    componentDidMount() {
        let developers = this.props.users.filter(user => user.role === 'Developer');
        this.setState({developer: developers[0].username})
    }

    
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveProjectId = (name) => {
        const projects = this.props.projects;
        let id;
        for (let i=0; i < projects.length; i++) {
            if (projects[i].title === name) {
                id = projects[i].id;
            }
            this.setState({ projectId: id })
        }
    }

    onSelectingProject = (event) => {
        this.saveProjectId(event.target.value);
        this.setState({ 
            project: event.target.value
        })
    }


    renderProjectSelection = () => {
        return this.props.projects.map(project => {
            return (
                <option key={project.id}>{project.title}</option>
            )
        })
    }

    renderDeveloperSelection = () => {
        let developers = this.props.users.filter(user => user.role === 'Developer');
        return developers.map(dev => {
            return (
                <option key={dev.id}>{dev.username}</option>
            )
        })
    }

    onCreateTicket = (event) => {
        event.preventDefault();
        this.props.createTicket({
            title: this.state.title,
            description: this.state.description,
            comment: this.state.comment,
            project: this.state.project,
            projectId: this.state.projectId,
            developer: this.state.developer,
            priority: this.state.priority,
            type: this.state.type,
            status: this.state.status,
            submitter: this.state.submitter
        })
    }


    render() {
        const projects = this.props.projects;
        return (
            <div> 
                {
                    !projects ? <div>FETCHING PROJECTS...</div> 

                    :

                    <main className="create-ticket-container">
                        <div className="edit-ticket-main">
                            <div className="list-container">
                                <header className="banner-container">
                                    <div className="list-banner">
                                        <p className="list-title">Create Ticket</p>
                                        <p>Create Ticket properties</p>
                                    </div>
                                </header>
                                <div className="details-container">
                                    <div className="details-row">
                                        <div className="details-row-leftside">
                                            <p className="row-title">Title</p>
                                            <input type="text" className="row-input" name="title" onChange={this.onChange}/>
                                        </div>
                                        <div className="details-row-rightside">
                                            <p className="row-title">Description</p>
                                            <input type="text" className="row-input" name="description" onChange={this.onChange}/>
                                        </div>
                                    </div>
                                    <div className="comment-row">
                                        {/* <p className="row-title title-comment">Add a comment</p> */}
                                        <p className="row-title">Add a comment</p>
                                        <input type="text" className="row-input" name="comment" onChange={this.onChange}/>
                                    </div>
                                    <div className="details-row">
                                        <div className="details-row-leftside">
                                            <p className="row-title">Assign to a Project</p>
                                            <div className="selection">
                                                <select name="project" onChange={this.onSelectingProject}>
                                                    {this.renderProjectSelection()}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="details-row-rightside">
                                            <p className="row-title">Assign a Developer</p>
                                            <div className="selection">
                                                <select name="developer" onChange={this.onChange}>
                                                    <option>{this.state.developer}</option>
                                                    {this.renderDeveloperSelection()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details-row">
                                        <div className="details-row-leftside">
                                            <p className="row-title">Ticket Priority</p>
                                            <div className="selection">
                                                <select name="priority" onChange={this.onChange}>
                                                    <option>None</option>
                                                    <option>Low</option>
                                                    <option>Medium</option>
                                                    <option>High</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="details-row-rightside">
                                            <p className="row-title">Ticket type</p>
                                            <div className="selection">
                                                <select name="type" onChange={this.onChange}>
                                                    <option>Bugs/Errors</option>
                                                    <option>Feature Requests</option>
                                                    <option>Other Comments</option>
                                                    <option>Training/Documents Requests</option>
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="nav-links">
                                        <Link to="/tickets">Back to List</Link>
                                        <div className="btn-container">
                                            <Button text="CREATE TICKET" onClick={this.onCreateTicket}/>
                                        </div>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </main>
                }
            </div>
        )
    }
} 

const mapStateToProps = state => {
    return { 
        projects: state.projects.projects,
        users: state.users.users 
    }
}

const mapDispatchToProps = {  createTicket }

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket); 