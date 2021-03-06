import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createTicket, fetchAllProjectUsers, closeReduxModal } from '../../redux/actions';
import Modal from '../../components/layout/display/Modal'
import Button from '../../components/layout/button/Button';
import '../../scss/containers/CreateTicket.scss';

    
class CreateTicket extends Component {
    
    state = {
        title: '',
        description: '',
        comment: '',
        project: '',
        projectId: '',
        developer: '',
        priority: 'None',
        type: 'Bugs/Errors',
        status: 'Open',
        submitter: '',
        showModal: false,
        notification: false,
        warning: false,
        noDeveloper: false,
        noProject: false
    }   

    componentDidMount() {
        const { projects, tickets, allProjectUsers } = this.props;
        if (projects.length !== 0 && allProjectUsers.length !== 0 && tickets.length !== 0) {
            let firstProject = projects[0];
            let firstdeveloper = allProjectUsers.filter(user => user.role === 'Developer' && user.projectID === firstProject.id);
            
            this.setState({
                project: firstProject.title,
                projectId: firstProject.id,
                developer: firstdeveloper.username,
            })

        } else {
            this.setState({ 
                notification: true,
                noProject: true 
            })
        }
    };

    closeModal = () => {
        this.setState({showModal: false})
    };

    closeNotification = () => {
        this.setState({
            notification: false, 
            warning: false,
            noProject: false
        })
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    saveProjectId = (name) => {
        const projects = this.props.projects;
        let id;
        for (let i=0; i < projects.length; i++) {
            if (projects[i].title === name) {
                id = projects[i].id;
            }
            this.setState({ projectId: id })
        }
    };

    onSelectingProject = (event) => {
        const { allProjectUsers } = this.props;
        let availableDevs =  allProjectUsers.filter(el => el.project === event.target.value && el.role === 'Developer');

        if (availableDevs.length === 0) {
            this.saveProjectId(event.target.value);
            this.setState({
                notification: true, 
                noDeveloper: true
            })
        } else {
            this.saveProjectId(event.target.value);
            this.setState({ 
                project: event.target.value,
                developer: availableDevs[0].username,
                noDeveloper: false
            })
        }
        
    };


    renderProjectSelection = () => {
        return this.props.projects.map(project => {
            return (
                <option key={project.id}>{project.title}</option>
            )
        })
    }; 

    renderDeveloperSelection = () => {
        let noDev = {username: 'No existing developer'}
        let developers = this.props.allProjectUsers.filter(user => user.role === 'Developer' && user.projectID === this.state.projectId)
        if (developers.length === 0) {
            return (
                <option key={Math.random()}>{noDev.username}</option>
            )
        } else {
            return developers.map(dev => {
                return (
                    <option key={dev.id}>{dev.username}</option>
                )
            })
        }
    };

    onSubmitTicket = () => {
        const { title, description, noDeveloper, project } = this.state;
        const { tickets } = this.props;
        const sameTitle = tickets.filter(ticket => ticket.title === title);

        if (!title || !description) {
            this.setState({ notification: true })

        } else if (!project) {
            this.setState({
                notification: true,
                noProject: true 
            })

        } else if (sameTitle.length !== 0) {
            this.setState({
                notification: true, 
                warning: true
            })

        } else if (noDeveloper) {
            this.setState({notification: true})

        } else {
            this.setState({ showModal: true })
        }
    };

    onCreateTicket = () => {
        const {  
            title, description, comment, project, projectId,
            developer, priority, type, status 
        } = this.state;
        const { users, currentUser } = this.props;
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
            submitter: currentUser.username,
            companyId: currentUser.companyId
        })

        this.setState({showModal: false})
    };

    ExitCreation = () => {
        this.props.closeReduxModal()
    }


    render() {
        const { wasSuccessful } = this.props;
        const { 
            showModal, notification, warning, noDeveloper, noProject, title, 
            description, project, comment, developer, priority, type 
        } = this.state;
        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";
        const showHideSuccessModal = wasSuccessful ? "display-block" : "display-none";

        return (
            <div>
                <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                {
                    warning ? 
                    <p>A ticket named "{title}" already exists. Please choose a different title.</p>
                    :
                    noDeveloper ?
                    <div>
                        <p>No developer is working on this project.</p>
                        <br/>
                        <p>Please ask an Admin or the Project Manager to assign a Developer to this project.</p>
                    </div>
                    :
                    noProject ?
                    <p>You cannot create a Ticket if there is no existing Project or Developer available.</p>
                    :
                    <p>Your ticket needs a title and a description</p>
                    
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

                            <h3 className="title">Project</h3>
                            <p className="detail">{project}</p>

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
                        <button className="btn2-main modal-btn btn-confirm" onClick={this.onCreateTicket}>
                            Confirm
                        </button>
                    </div>
                </Modal>

                <Modal visibility={showHideSuccessModal} type="modal-container new-ticket scale-up-center">
                    <div className="changes-details">
                        <i className="fas fa-check fa-4x create-success"></i>
                            <h3>Your Ticket has been created sucessfully</h3>
                    </div>
                    <div className="modal-btns">
                        <Link to="/tickets">
                            <button className="btn2-main modal-btn btn-confirm" onClick={this.ExitCreation}>
                                Ok
                            </button>
                        </Link>
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
                                        <p className="row-title">Select a Project</p>
                                        <div className="selection">
                                            <select name="project" onChange={this.onSelectingProject}>
                                                {this.renderProjectSelection()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Select a Developer</p>
                                        <div className="selection">
                                            <select name="developer" onChange={this.onChange}>
                                            {/* <select name="developer" onChange={this.onSelectingDeveloper}> */}
                                                {/* <option>{this.state.developer}</option> */}
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
        allProjectUsers: state.users.allProjectUsers,
        tickets: state.tickets.tickets,
        wasSuccessful: state.tickets.wasSuccessful,
        users: state.users.users,
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = {  createTicket, fetchAllProjectUsers, closeReduxModal }

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket); 