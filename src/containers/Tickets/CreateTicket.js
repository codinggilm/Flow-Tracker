import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createTicket } from '../../redux/actions';
import Modal from '../../components/layout/display/Modal'
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
        priority: 'None',
        type: 'Bugs/Errors',
        status: 'Open',
        submitter: 'admin',
        showModal: false,
        notification: false,
        warning: false
    }  

    componentDidMount() {
        let developers = this.props.users.filter(user => user.role === 'Developer');
        this.setState({developer: developers[0].username})
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    closeNotification = () => {
        this.setState({notification: false, warning: false})
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

    onSubmitTicket = () => {
        const { title, description } = this.state;
        const { tickets } = this.props;
        const sameTitle = tickets.filter(ticket => ticket.title === title);

        if (!title || !description) {
            this.setState({ notification: true })

        } else if (sameTitle.length !== 0) {
            this.setState({
                notification: true, 
                warning: true
            })
        } else {
            this.setState({ showModal: true })
        }
    }

    onCreateTicket = () => {
        const { 
            title, description, comment, project, projectId,
            developer, priority, type, status, submitter 
        } = this.state;
        const { users } = this.props;
        const selectedDeveloper = users.filter(user => user.username === developer);

        this.props.createTicket({
            title: title,
            description: description,
            comment: comment,
            project: project,
            projectId: projectId,
            developer: developer,
            developerId: selectedDeveloper[0].id,
            priority: priority,
            type: type,
            status: status,
            submitter: submitter
        })
    }


    render() {
        const { 
            showModal, notification, warning, title, 
            description, comment, developer, priority, type 
        } = this.state;
        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";

        return (
            <div> 

                <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                {
                    warning ? 
                    <p>A ticket named {title} already exists. Please choose a different name.</p>
                    :
                    <p>Your ticket needs a Title and a Description</p>
                    
                }
                    <div className="modal-btns">
                        <button className="btn2-main modal-btn btn-confirm" onClick={this.closeNotification}>
                            Ok
                        </button>
                    </div>
                </Modal>

                <Modal visibility={showHideModal} type="modal-container new-ticket scale-up-center">
                    <h2 className="header">Create this Ticket?</h2>
                    <div className="changes-details">
                            <h3 className="title">Title</h3>
                            <p className="detail">{title}</p>

                            <h3 className="title">Description</h3>
                            <p className="detail">{description}</p>
                            {
                                comment ?

                                <div>
                                    <h3 className="title">Comment</h3>
                                    <p className="detail">{comment}</p>
                                </div>
                                : 
                                null
                            }

                            <h3 className="title">Developer</h3>
                            <p className="detail">{developer}</p>

                            <h3 className="title">Priority</h3>
                            <p className="detail">{priority}</p>

                            <h3 className="title">Type</h3>
                            <p className="detail">{type}</p>
                    </div>
                    <div className="modal-btns">
                        <button className="btn2-main modal-btn btn-cancel" onClick={this.closeModal}>
                            Cancel
                        </button>
                        <a href="/tickets">
                            <button className="btn2-main modal-btn btn-confirm" onClick={this.onCreateTicket}>
                                Confirm
                            </button>
                        </a>
                    </div>
                </Modal>

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
                                            {/* <select name="developer" onChange={this.onSelectingDeveloper}> */}
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
                                        <Button text="CREATE TICKET" onClick={this.onSubmitTicket}/>
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
        tickets: state.tickets.tickets,
        users: state.users.users 
    }
}

const mapDispatchToProps = {  createTicket }

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket); 