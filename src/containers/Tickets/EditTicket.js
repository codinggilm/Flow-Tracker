import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchProject, fetchTicket, editTicket, deleteTicket } from '../../redux/actions';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/EditTicket.scss';
 
    
class EditTicket extends Component {
 
    state = {
        title: '',
        description: '',
        project: '',
        projectId: '',
        developer: '',
        priority: '',
        type: '',
        status: '',
        submitter: 'admin'
    }

    componentDidMount() {
        this.props.fetchProjects();
        this.props.fetchTicket(this.props.ticketId)
        this.props.fetchProject(this.props.projectId);

        this.setState({
            title: this.props.ticket[0].title,
            description: this.props.ticket[0].description,
            project: this.props.project[0].title,
            projectId: this.props.project[0].projectId,
            developer: this.props.ticket[0].developer,
            priority: this.props.ticket[0].priority,
            type: this.props.ticket[0].type,
            status: this.props.ticket[0].status
        })
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveProjectIdToLocalState = (name) => {
        const projects = this.props.projects;
        let id;
        for (let i=0; i < projects.length; i++) {
            if (projects[i].title === name) {
                id = projects[i].id;
            }
            this.setState({ projectId: id })
        }
    }

    onProjectSelection = (event) => {
        this.saveProjectIdToLocalState(event.target.value);
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

    onEditTicket = (event) => {
        event.preventDefault();
        this.props.editTicket(
            this.props.ticketId, {
            title: this.state.title,
            description: this.state.description,
            project: this.state.project,
            projectId: this.state.projectId,
            developer: this.state.developer,
            priority: this.state.priority,
            type: this.state.type,
            status: this.state.status,
            submitter: this.state.submitter
        })
    }
    onDeleteTicket = () => {
        this.props.deleteTicket(this.props.ticketId)
    }
    
    render() {
        const ticket = this.props.ticket[0];
        return (
            <div> 
                <main className="edit-ticket-container">
                    <div className="edit-ticket-main">
                        <div className="list-container">
                            <header className="banner-container">
                                <div className="list-banner">
                                    <p className="list-title">Edit Ticket</p>
                                    <p>Change Ticket properties</p>
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
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Project</p>
                                        <div className="selection">
                                            <select name="project" onChange={this.onProjectSelection}>
                                                <option>{ticket.project}</option>
                                                {this.renderProjectSelection()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Assigned New Developer</p>
                                        <div className="selection">
                                            <select name="developer" onChange={this.onChange}>
                                                <option>{ticket.developer}</option>
                                                <option>Rebecca Abell</option>
                                                <option>Bobby Davis</option>
                                                <option>Jorgen Malakith</option>
                                                <option>Alexandre Plard</option>
                                                <option>Guillaume Croizon</option>
                                                <option>Brian Thomas</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Ticket Priority</p>
                                        <div className="selection">
                                            <select name="priority" onChange={this.onChange}>
                                                <option>{ticket.priority}</option>
                                                <option>None</option>
                                                <option>Low</option>
                                                <option>Medium</option>
                                                <option>High</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Ticket Status</p>
                                        <div className="selection">
                                            <select name="status" onChange={this.onChange}>
                                                <option>{ticket.status}</option>
                                                <option>In Progress</option>
                                                <option>Open</option>
                                                <option>Closed</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Ticket type</p>
                                        <div className="selection">
                                            <select name="type" onChange={this.onChange}>
                                                <option>{ticket.type}</option>
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
                                    <button 
                                        className="btn-del-ticket"
                                        onClick={this.onDeleteTicket}
                                    >DELETE TICKET
                                    </button>
                                    <div className="btn-container">
                                        <Button text="UPDATE TICKET" onClick={this.onEditTicket}/>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        projects: state.projects.projects,
        project: state.projects.project,
        projectId: state.projects.projectId,
        ticketId: state.tickets.ticketId,
        ticket: state.tickets.ticket
    }
}

const mapDispatchToProps = { fetchProjects, fetchProject, fetchTicket, editTicket, deleteTicket }

export default connect(mapStateToProps, mapDispatchToProps)(EditTicket); 