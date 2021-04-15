import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProject, editProject, deleteProject, removeUserFromProject, closeReduxModal } from '../../redux/actions';
import Modal from '../../components/layout/display/Modal';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/EditProject.scss';

 
 
class EditProject extends Component {

    state = {
        title: this.props.project.title,
        description: this.props.project.description,
        userID: '',
        userToRemove: null,
        showModal: false,
        notification: false,
        warning: false,
        sameTitle: false,
        removeUserRequest: false,
        cannotRemoveUser: false,
        noChanges: false,
        noneSelected: false,
        deleteProject: false,
        
    };

    componentDidMount = () => {
        this.props.fetchProject(this.props.projectId); 
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    closeModal = () => {
        this.setState({ showModal: false })
    };

    closeNotification = () => {
        this.setState({ 
            notification: false, 
            warning: false, 
            removeUserRequest: false,
            sameTitle: false,
            cannotRemoveUser: false,
            noChanges: false,
            noneSelected: false
        })
    };

    renderAssignedUsers = () => {
        const users = this.props.projectUsers;
        return users.map(user => {
            return <option value={user.userID} key={user.userID}>{user.username}</option>
        })
    };

    onSelectingUser = (event) => {
        this.setState({ 
            userID: parseInt(event.target.value)
        })
    };

    removeUser = () => {
        const { users, tickets, projectId } =  this.props;
        const { userID } = this.state;
        
        if (!userID) {
            this.setState({
                notification: true,
                noneSelected: true
            })
        }
        
        if (userID) {
            const selectedUser = users.filter(user => user.id === userID)[0].username;
            const cannotRemove = tickets.filter(
                ticket => ticket.status === 'Open' && ticket.developer === selectedUser && 
                ticket.projectId === projectId
            )

            if (cannotRemove.length !== 0) {
                this.setState({ 
                    notification: true,
                    cannotRemoveUser: true  
                })
            } else {
                this.setState({ 
                    notification: true,
                    removeUser: true,
                    userToRemove: selectedUser
                })
            }
        }

    };

    onSubmitEditProject = () => {
        const { projects, project } = this.props;
        const { title, description, userToRemove } = this.state;
        const sameTitle = projects.filter(project => project.title === title);

        if (!title || !description) {
            this.setState({ notification: true, warning: true })
        
        } else if (title !== project.title && sameTitle.length !== 0 && userToRemove === null) {
            this.setState({
                notification: true, 
                sameTitle: true
            })
        } else if (title === project.title && description === project.description && userToRemove === null) {
            this.setState({
                notification: true, 
                noChanges: true
            })
        } else {
            this.setState({
                showModal: true
            })
        }
    };
    
    onConfirmEditProject = () => {
        const { title, description, userToRemove, userID, deleteProject } = this.state
        const { project, projectId } = this.props;

        if (title === project.title && description === project.description && userToRemove !== null) {
            this.props.removeUserFromProject(project.id, userID)
        } else if (deleteProject) {
            this.props.deleteProject(projectId)
        } else {
            this.props.editProject(
                projectId, 
                {
                    title: title,
                    description: description,
                    userToRemove: userToRemove
                }
            )
        }

        this.closeModal();

    }

    onSubmitDeleteProject = () => {
        this.setState({
            showModal: true,
            deleteProject: true
        })
    };

    ExitUpdate = () => {
        this.props.closeReduxModal();

    }

    render() {
        const { 
            title, description, userToRemove, showModal, notification, 
            warning, cannotRemoveUser, noneSelected, sameTitle, noChanges, deleteProject 
        } = this.state;
        const { wasSuccessful } = this.props;
        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";
        const showHideSuccessModal = wasSuccessful ? "display-block" : "display-none";

        return (
            <div>

            <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                {
                    warning ? 
                    <p>Your project needs a Name and a Description</p> 
                    :
                    sameTitle ?
                    <p>A project named "{title}" already exists. Please choose a different title.</p>
                    :
                    cannotRemoveUser ? 
                    <p>You cannot remove a user currently assigned to an open ticket on this project.</p>
                    :
                    noChanges ? 
                    <p>Nothing has changed</p>
                    :
                    noneSelected ? 
                    <p>You need to select a user first.</p>
                    :
                    <p>{userToRemove} will be removed from the Project once you confirm the update.</p>
                }
                    <div className="modal-btns">
                        <button className="btn2-main modal-btn btn-confirm" onClick={this.closeNotification}>
                            Ok
                        </button>
                    </div>
                </Modal>

                <Modal visibility={showHideModal} type="modal-container main scale-up-center">
                {
                    deleteProject ? 

                    <div>
                        <div className="warning">
                            <i className="fas fa-exclamation-triangle fa-5x"></i>
                            <h2 className="header warning-header">Are you sure you want to delete this project?</h2>
                            <div className="warning-text">
                                <h3>The following will be permanently deleted:</h3>
                                <p>- All the past & present tickets associated with this project</p>
                                <p>- All the history, comments and attachments of these tickets</p>
                                <p>- All the analytics of these tickets</p>
                                <p className="final-warning"><strong>There is no going back, are you sure you wish to proceed?</strong></p>
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
                            {
                                userToRemove !== null ?
                                <div>
                                    <h3 className="title">User to remove from Project</h3>
                                    <p className="detail">{userToRemove}</p>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                }   
                        <div className="modal-btns">
                            <button className="btn2-main modal-btn btn-cancel" onClick={this.closeModal}>
                                Cancel
                            </button>
                            <button className="btn2-main modal-btn btn-confirm" onClick={this.onConfirmEditProject}>
                                Confirm
                            </button>
                        </div>
                </Modal>

                <Modal visibility={showHideSuccessModal} type="modal-container new-ticket scale-up-center">
                    <div className="changes-details">
                        <i className="fas fa-check fa-4x create-success"></i>
                        {
                            deleteProject ? 
                            <h3>Your Project has been deleted sucessfully</h3>
                            :
                            <h3>Your Project has been updated sucessfully</h3>
                        }
                    </div>
                    <div className="modal-btns">
                        <Link to="/projects">
                            <button className="btn2-main modal-btn btn-confirm" onClick={this.ExitUpdate}>
                                Ok
                            </button>
                        </Link>
                    </div>
                </Modal> 

                <main className="edit-project-container">
                    <div className="edit-ticket-main">
                        <div className="list-container">
                            <header className="banner-container">
                                <div className="list-banner">
                                    <p className="list-title">Edit Project</p>
                                    <p>Change Project properties</p>
                                </div>
                            </header>
                            <div className="details-container">
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Project Name</p>
                                        <input 
                                            type="text" 
                                            className="row-input" 
                                            name="title" 
                                            defaultValue={this.props.project.title}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Description</p>
                                        <input 
                                            type="text" 
                                            className="row-input" 
                                            name="description"
                                            defaultValue={this.props.project.description} 
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Assigned Personnel</p>
                                        <div className="selection">
                                            {/* <select name="user" onChange={this.onChange}> */}
                                            <select onChange={this.onSelectingUser}>
                                                <option> Select User </option>
                                                {this.renderAssignedUsers()}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Actions</p>
                                        <div className="btn-actions">
                                            {/* <button className="btn-add-user">ADD</button> */}
                                            <button 
                                                className="btn-del-user"
                                                onClick={()=>this.removeUser()}
                                            >REMOVE USER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Tickets</p>
                                        <div className="selection">
                                            <select>
                                                <option>Ticket 1</option>
                                                <option>Ticket 2</option>
                                                <option>Ticket 3</option>
                                                <option>Ticket 4</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Actions</p>
                                        <div className="btn-actions">
                                            <button className="btn-del-user">REMOVE TICKET</button>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="nav-links">
                                    <Link to="/projects">Back to List</Link>
                                    <button 
                                        className="btn-del-project"
                                        onClick={this.onSubmitDeleteProject}>DELETE PROJECT
                                    </button>
                                    <div className="btn-container">
                                        <Button 
                                            text="UPDATE PROJECT"
                                            onClick={this.onSubmitEditProject}
                                        />
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
        project: state.projects.project[0],
        projects: state.projects.projects,
        projectId: state.projects.projectId,
        users: state.users.users,
        projectUsers: state.users.projectUsers,
        tickets: state.tickets.tickets,
        wasSuccessful: state.projects.wasSuccessful 
    }
}

const mapDispatchToProps = { fetchProject, editProject, deleteProject, removeUserFromProject, closeReduxModal }

export default connect(mapStateToProps, mapDispatchToProps)(EditProject); 