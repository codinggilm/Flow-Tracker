import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProject, editProject, deleteProject } from '../../redux/actions';
import Modal from '../../components/layout/display/Modal';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/EditProject.scss';

 
 
class EditProject extends Component {

    state = {
        title: this.props.project.title,
        description: this.props.project.description,
        // projectId: this.props.projectId,
        userID: '',
        userToRemove: null,
        showModal: false,
        notification: false,
        warning: false,
        sameTitle: false,
        removeUser: false
    }

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
            removeUser: false
        })
    };

    renderAssignedUsers = () => {
        // const users = this.props.users.filter(user => user.projectId === this.props.projectId);
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
        const selectedUser = this.props.users.filter(user => user.id === this.state.userID)[0].username;
        this.setState({ 
            notification: true,
            removeUser: true,
            userToRemove: selectedUser
        })
    };

    onSubmitEditProject = () => {
        const { projects } = this.props;
        const { title, description, userToRemove } = this.state;
        const sameTitle = projects.filter(project => project.title === title);


        if (!title || !description) {
            this.setState({ notification: true, warning: true })

        } else if (sameTitle.length !== 0 && userToRemove === null) {
            this.setState({
                notification: true, 
                sameTitle: true
            })
        } else {
            this.setState({
                showModal: true
            })
        }

        // const { title, description, userToRemove } = this.state;
        // this.props.editProject(
        //     this.props.projectId, 
        //     {
        //         title: title,
        //         description: description,
        //         // projectId: this.props.projectId,
        //         userToRemove: userToRemove
        //     }
        // )
    }; 

    onDeleteProject = () => {
        this.props.deleteProject(this.props.projectId)
    };

    render() {
        const { 
            title, description, username, userToRemove, showModal, 
            warning, removeUser, notification, sameTitle 
        } = this.state;
        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";

        return (
            <div>


            <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                {
                    warning ? 
                    <p>Your project needs a Name and a Description</p> 
                    :
                    sameTitle ?
                    <p>A project named {title} already exists. Please choose a different name.</p>
                    :
                    removeUser ?
                    <p>{userToRemove} will be removed from the Project upon confirmation</p>
                    :
                    <p>You've added {username} to your Project</p>
                }
                    <div className="modal-btns">
                        <button className="btn2-main modal-btn btn-confirm" onClick={this.closeNotification}>
                            Ok
                        </button>
                    </div>
                </Modal>

                <Modal visibility={showHideModal} type="modal-container main scale-up-center">
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
                        <h3 className="title">Assigned User</h3>
                        <p className="detail">{username}</p>
                    </div>
                        <div className="modal-btns">
                            <button className="btn2-main modal-btn btn-cancel" onClick={this.closeModal}>
                                Cancel
                            </button>
                            <a href="/projects">
                                <button className="btn2-main modal-btn btn-confirm" onClick={this.onCreateProject}>
                                    Confirm
                                </button>
                            </a>
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
                                <div className="details-row">
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
                                            {/* <button className="btn-add-user">ADD</button> */}
                                            <button className="btn-del-user">REMOVE TICKET</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="nav-links">
                                    <Link to="/projects">Back to List</Link>
                                    <button 
                                        className="btn-del-project"
                                        onClick={this.onDeleteProject}>DELETE PROJECT
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
        projectUsers: state.users.projectUsers
    }
}

const mapDispatchToProps = { fetchProject, editProject, deleteProject }

export default connect(mapStateToProps, mapDispatchToProps)(EditProject); 