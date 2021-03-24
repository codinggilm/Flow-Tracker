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
        this.props.fetchProject(this.props.projectId);
        this.props.fetchTicket(this.props.ticketId);
        this.setDefaultState(this.props.tickets);
        
    }

    setDefaultState = (tickets) => {
        const currentTicket = tickets.filter(ticket => ticket.id === this.props.ticketId);
        this.setState({
            title: currentTicket[0].title,
            description: currentTicket[0].description,
            project: currentTicket[0].project,
            projectId: currentTicket[0].projectId,
            developer: currentTicket[0].developer,
            priority: currentTicket[0].priority,
            type: currentTicket[0].type,
            status: currentTicket[0].status
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

    onSelectingProject = (event) => {
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

    renderDeveloperSelection = () => {
        let developers = this.props.users.filter(user => user.role === 'Developer');
        return developers.map(dev => {
            return (
                <option key={dev.id}>{dev.username}</option>
            )
        })
    }

    onEditTicket = () => {
        const name = this.state.developer;
        const selectedDeveloper = this.props.users.filter(user => user.username === name);

        this.props.editTicket(
            this.props.ticketId, {
            title: this.state.title,
            description: this.state.description,
            project: this.state.project,
            projectId: this.state.projectId,
            developer: this.state.developer,
            developerId: selectedDeveloper[0].id,
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
        // const ticket = this.props.ticket;
        const ticket = this.props.tickets.filter(ticket => ticket.id === this.props.ticketId);
        return (
            <div>
            {
                !ticket ? <div>LOADING... </div>

                :

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
                                        <input 
                                            type="text" 
                                            className="row-input" 
                                            name="title"
                                            defaultValue={ticket[0].title} 
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Description</p>
                                        <input type="text" 
                                            className="row-input" 
                                            name="description"
                                            defaultValue={ticket[0].description} 
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Project</p>
                                        <div className="selection">
                                            <select name="project" onChange={this.onSelectingProject}>
                                                <option>{ticket[0].project}</option>
                                                {this.renderProjectSelection()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Assigne New Developer</p>
                                        <div className="selection">
                                            <select name="developer" onChange={this.onChange}>
                                                <option>{ticket[0].developer}</option>
                                                {this.renderDeveloperSelection()}
                                                {/* <option>Rebecca Abell</option>
                                                <option>Bobby Davis</option>
                                                <option>Jorgen Malakith</option>
                                                <option>Alexandre Plard</option>
                                                <option>Guillaume Croizon</option>
                                                <option>Brian Thomas</option> */}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Ticket Priority</p>
                                        <div className="selection">
                                            <select name="priority" onChange={this.onChange}>
                                                <option>{ticket[0].priority}</option>
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
                                                <option>{ticket[0].status}</option>
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
                                                <option>{ticket[0].type}</option>
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
                                        <Button 
                                            text="UPDATE TICKET" 
                                            onClick={this.onEditTicket}
                                        />
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
        project: state.projects.project[0],
        projectId: state.projects.projectId,
        ticketId: state.tickets.ticketId,
        ticket: state.tickets.ticket[0],
        tickets: state.tickets.tickets,
        users: state.users.users
    }
}

const mapDispatchToProps = { fetchProjects, fetchProject, fetchTicket, editTicket, deleteTicket }

export default connect(mapStateToProps, mapDispatchToProps)(EditTicket); 