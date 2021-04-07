import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, fetchProject, fetchTicket, 
    editTicket, fetchAllProjectUsers, saveTicketHistory, deleteTicket 
} from '../../redux/actions';
import Modal from '../../components/layout/display/Modal';
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
        submitter: 'Admin',
        showModal: false,
        notification: false,
        warning: false,
        noChange: false,
        sameTitle: false,
        deleteTicket: false
        // noDeveloper: false,
        // newProject: false,
        // currentTicket: true
    }

    componentDidMount() {
        this.props.fetchProjects();
        this.props.fetchProject(this.props.projectId);
        this.props.fetchTicket(this.props.ticketId);
        this.props.fetchAllProjectUsers();
        this.setDefaultState();        
    };

    setDefaultState = () => {
        const { ticket } = this.props;
        this.setState({
            title: ticket.title,
            description: ticket.description,
            project: ticket.project,
            projectId: ticket.projectId,
            developer: ticket.developer,
            priority: ticket.priority,
            type: ticket.type,
            status: ticket.status
        })
    };

    closeModal = () => {
        this.setState({showModal: false})
    };

    closeNotification = () => {
        this.setState({
            notification: false,
            warning: false,
            newProject: false,
            noChange: false,
            sameTitle: false
        })
    };

    onChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value
        })
        
    };

    saveProjectIdToLocalState = (name) => {
        const { projects } = this.props;
        let id;
        for (let i=0; i < projects.length; i++) {
            if (projects[i].title === name) {
                id = projects[i].id;
            }
            this.setState({ projectId: id })
        }
    };

    onSelectingProject = (event) => {
        this.saveProjectIdToLocalState(event.target.value);
        let developers = this.props.allProjectUsers.filter(user => user.role === 'Developer' && 
            user.projectID === this.state.projectId
        )

        if (developers.length === 0) {
            this.setState({ 
                project: event.target.value,
                noDeveloper: true,
                currentTicket: false 
            })
        } else {
            this.setState({  
                project: event.target.value,
                noDeveloper: false,
                currentTicket: false 
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
        // let noDev = {username: 'No existing developer'}
        let developers = this.props.allProjectUsers.filter(user => user.role === 'Developer' && user.projectID === this.state.projectId)
        // if (developers.length === 0) {
        //     return (
        //         <option key={Math.random()}>{noDev.username}</option>
        //     )
        // } else {
            return developers.map(dev => {
                return (
                    <option key={dev.id}>{dev.username}</option>
                )
            })
        // }
    };

    saveHistory = (obj1, obj2) => {

        let key;
        let diffs = {};
        let oldData = {};
        let newData = {};
        let ticketHistory = [];
    
        // Loop through the first object, save differences & old data
        for (key in obj1) {
            if (obj1[key] !== obj2[key] ) {

                diffs[key] = obj2[key];
                oldData[key] = obj1[key];
            }
        }
        
        // Save relevant changes into the newData object
        for (key in diffs) {
            if (diffs[key] !== undefined) {
                newData[key] = diffs[key]
            }
        }
    
        // Remove unecessary keys from oldData object 
        const removeKeys = (obj) => {
            let skipKeys = ['createdAt', 'updatedAt', 'developerId', 'id', 'projectId'];

            skipKeys.forEach(key => delete obj[key]);

            return obj;
        }
        removeKeys(oldData);

        // Extract proprety names into an array
        const properties = Object.keys(oldData);

        // Extract values of old & new data into arrays
        const value1 = Object.values(oldData);
        const value2 = Object.values(newData);

        // Helper function to make first letter a capital
        const firstLetterCap = (string) => string.charAt(0).toUpperCase() + string.slice(1);

        // Create a new object for each change that occured
        for(let i=0; i<properties.length; i++) {
            ticketHistory.push({
                property: firstLetterCap(properties[i]),
                oldValue: value1[i],
                newValue: value2[i]
            })
            
        }

        // Loop through the ticket history array and send all changes to the database
        for(let i=0; i<ticketHistory.length; i++) {
            this.props.saveTicketHistory(this.props.ticketId, ticketHistory[i])
        }
    
    };

    onSubmitEditTicket = () => {
        const { title, description, project, projectId, developer, priority, status, type } = this.state;
        const { tickets, ticket } = this.props;
        const sameTitle = tickets.filter(ticket => ticket.title === title);

        if (!title || !description) {
            this.setState({ notification: true, warning: true })
        
        } else if (title !== ticket.title && sameTitle.length !== 0) {
            this.setState({
                notification: true, 
                sameTitle: true
            })
        } 
        else if (title === ticket.title && description === ticket.description && projectId === ticket.projectId && 
            developer === ticket.developer && priority === ticket.priority && status === ticket.status &&
            type === ticket.type) {
            this.setState({
                notification: true, 
                noChange: true
            })
        } else {
            this.setState({
                showModal: true
            })
        }
    };

    onConfirmEditTicket = () => {
        const { title, description, project, projectId, developer, priority, type, status, submitter, deleteTicket } = this.state;
        const { users, ticket, ticketId } = this.props;
        const selectedDeveloper = users.filter(user => user.username === developer)[0];
        
        if (deleteTicket) {
            this.props.deleteTicket(this.props.ticketId)
        } else {
            this.saveHistory(ticket, this.state);
    
            this.props.editTicket(
                ticketId, {
                    title: title,
                    description: description,
                    project: project,
                    projectId: projectId,
                    developer: developer,
                    developerId: selectedDeveloper.id,
                    priority: priority,
                    type: type,
                    status: status,
                    submitter: submitter
                }
            )
        }
    };

    onSubmitDeleteTicket = () => {
        this.setState({ showModal: true, deleteTicket: true })
    };
    
    render() {
        const {  
            showModal, notification, warning, noChange, deleteTicket, sameTitle, newProject, title, 
            description, project, developer, priority, status, type 
        } = this.state;

        const { ticket } = this.props;
        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";
        
        return (
            <div>
            {
                !ticket ? <div>LOADING... </div>
                
                :

                <div>
                    <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                    {
                        warning ?
                        <p>Your ticket needs a Title and a Description</p> 
                        :
                        newProject ?
                        <div>
                            <p>It is not possible to assign a ticket to a new project.</p>
                            <br/>
                            <p>I am working on adding this functionality though!</p>
                        </div>
                        :
                        noChange ? 
                        <p>Nothing has changed.</p>
                        :
                        sameTitle ? 
                        <p>A ticket named "{title}" already exists. Please choose a different title.</p> : null
                        
                    }
                        <div className="modal-btns">
                            <button className="btn2-main modal-btn btn-confirm" onClick={this.closeNotification}>
                                Ok
                            </button>
                        </div>
                    </Modal>

                    <Modal visibility={showHideModal} type="modal-container new-ticket scale-up-center">
                    {   
                        deleteTicket ? 
                        <div>
                            <div className="warning">
                                <i className="fas fa-exclamation-triangle fa-5x"></i>
                                <h2 className="header warning-header">Are you sure you want to delete this ticket?</h2>
                                <div className="warning-text">
                                    <h3>The following will be permanently deleted:</h3>
                                    <p>- All the history, comments and attachments of this tickets</p>
                                    <p className="final-warning">
                                        <strong>There is no going back, are you sure you wish to proceed?</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <h2 className="header">Save these changes?</h2>
                            <div className="changes-details">
                                <h3 className="title">Title</h3>
                                <p className="detail">{title}</p>

                                <h3 className="title">Description</h3>
                                <p className="detail">{description}</p>

                                <h3 className="title">Project</h3>
                                <p className="detail">{project}</p>

                                <h3 className="title">Developer</h3>
                                <p className="detail">{developer}</p>

                                <h3 className="title">Priority</h3>
                                <p className="detail">{priority}</p>

                                <h3 className="title">Status</h3>
                                <p className="detail">{status}</p>

                                <h3 className="title">Type</h3>
                                <p className="detail">{type}</p>
                            </div>
                        </div>
                    }
                        
                        <div className="modal-btns">
                            <button className="btn2-main modal-btn btn-cancel" onClick={this.closeModal}>
                                Cancel
                            </button>
                            <a href="/tickets">
                                <button className="btn2-main modal-btn btn-confirm" onClick={this.onConfirmEditTicket}>
                                    Confirm
                                </button>
                            </a>
                        </div>
                    </Modal>

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
                                                defaultValue={ticket.title} 
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div className="details-row-rightside">
                                            <p className="row-title">Description</p>
                                            <input type="text" 
                                                className="row-input" 
                                                name="description"
                                                defaultValue={ticket.description} 
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="details-row">
                                        <div className="details-row-leftside">
                                            <p className="row-title">Project</p>
                                            <div className="selection">
                                                <select name="project" onChange={this.onSelectingProject}>
                                                    <option>{ticket.project}</option>
                                                    {/* {this.renderProjectSelection()} */}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="details-row-rightside">
                                            <p className="row-title">Assigned Developer</p>
                                            <div className="selection">
                                                <select name="developer" onChange={this.onChange}>
                                                    <option>{ticket.developer}</option>
                                                    {this.renderDeveloperSelection()}
                                                </select>
                                                {/* <select name="developer" onChange={this.onChange}>
                                                {   
                                                    currentTicket ?
                                                    <option>{ticket.developer}</option>
                                                    :
                                                    noDeveloper ?
                                                    <option>No existing developer</option>
                                                    :
                                                    <option>Select developer</option>
                                                }  
                                                    {this.renderDeveloperSelection()}
                                                </select> */}
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
                                            onClick={this.onSubmitDeleteTicket}
                                        >DELETE TICKET
                                        </button>
                                        <div className="btn-container">
                                            <Button 
                                                text="UPDATE TICKET" 
                                                onClick={this.onSubmitEditTicket}
                                            />
                                        </div>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
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
        users: state.users.users,
        allProjectUsers: state.users.allProjectUsers
    }
}

const mapDispatchToProps = { 
    fetchProjects, fetchProject, fetchTicket, fetchAllProjectUsers,
    editTicket, saveTicketHistory, deleteTicket 
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTicket); 