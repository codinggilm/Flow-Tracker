import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProject, fetchUsers } from '../../redux/actions';
import Modal from '../../components/layout/display/Modal'
import Button from '../../components/layout/button/Button';
import '../../scss/containers/CreateProject.scss';
 
   
class CreateProject extends Component { 
 
    state = {
        title: '',
        description: '',
        username: null,
        userId: '',
        showModal: false,
        notification: false,
        warning: false,
        sameTitle: false
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    renderUsersList = () => {
        return this.props.users.map(user => {
           return <option key={user.id}>{user.username}</option>
        })
    };

    closeModal = () => {
        this.setState({showModal: false})
    };

    closeNotification = () => {
        this.setState({notification: false, warning: false})
    };

    addUser = () => {
        const { username } = this.state;
        
        if (username && username !== '--Select User--') {
            let user = this.props.users.filter(user => user.username === username);
            let id = user[0].id;
            this.setState({ 
                userAdded: username,
                userId: id,
                notification: true
            })
        }

    };


    onSubmitProject = () => {
        const { title, description } = this.state;
        const { projects } = this.props;
        const sameTitle = projects.filter(project => project.title === title);

        if (!title || !description) {
            this.setState({notification: true, warning: true})

        } else if (sameTitle.length !== 0) {
            this.setState({
                notification: true, 
                sameTitle: true
            })
        } else {
            this.setState({showModal: true})
        }
    };

    onCreateProject = () => {
        const { title, description, userAdded, userId } = this.state;
        const { users } = this.props;
        const userRole = users.filter(user => user.id === userId)[0].role;

        this.props.createProject({
            title: title,
            description: description,
            userAdded: userAdded,
            role: userRole,
            userId: userId
        })   
    };

    render() {
        const { title, description, username, warning, showModal, notification, sameTitle } = this.state;
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
                    <p>A project named "{title}" already exists. Please choose a different title.</p>
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
                    <h2 className="header">Create this Project?</h2>
                    <div className="changes-details">
                        <h3 className="title">Title</h3>
                        <p className="detail">{title}</p>
                        <h3 className="title">Description</h3>
                        <p className="detail">{description}</p>
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
 
            
                <main className="create-project-container">
                    <div className="edit-ticket-main">
                        <div className="list-container">
                            <header className="banner-container">
                                <div className="list-banner">
                                    <p className="list-title">Create Project</p>
                                    <p>Add Project properties</p>
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
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Project Description</p>
                                        <input type="text" className="row-input" name="description" onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Add a user</p>
                                        <div className="selection">
                                            {/* <select name="developer" onChange={this.onChange}> */}
                                            <select name="username" onChange={this.onChange}>
                                                <option>Select User</option>
                                                {this.renderUsersList()}
                                            </select>
                                        </div> 
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Action</p>
                                        <div className="btn-actions">
                                            <button 
                                                className="btn-add-user"
                                                onClick={this.addUser}
                                            >
                                            ADD THIS USER
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="nav-links">
                                    <Link to="/projects">Back to List</Link>
                                    <div className="btn-container">
                                        <Button 
                                            text="CREATE PROJECT"
                                            onClick={this.onSubmitProject}  
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

const mapStateToProps = (state) => {
	return { 
        projects: state.projects.projects,
        users: state.users.users 
    }
}

const mapDispatchToProps = { createProject, fetchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);