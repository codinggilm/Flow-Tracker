import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchProjectUsers, assignProject } from '../../redux/actions';
// import ProjectsList2 from '../../components/lists/ProjectsList2';
import AllProjectUsers from '../../components/lists/AllProjectUsers'
import Modal from '../../components/layout/display/Modal';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/ProjectAssign.scss';
 
 
class ProjectAssign extends Component {

    state = {
        username: '',
        userId: '',
        project: '',
        projectId: '',
        showModal: false,
        notification: false,
        warning: false

    }

    componentDidMount = () => {
        this.props.fetchUsers();
    }

    closeModal = () => {
        this.setState({showModal: false});
    }

    closeNotification = () => {
        this.setState({notification: false});
    }

    saveUsernameToLocalState = (id) => {
        let { users } = this.props;
        let user;
        for(let i=0; i < users.length; i++) {
            if (users[i].id === id) {
                user = users[i].username
            }
            this.setState({username: user})
        }
    }

    setUsernameAndId = (event) => {
        this.saveUsernameToLocalState(parseInt(event.target.value))
        this.setState({ 
            userId: parseInt(event.target.value)
        })
    }

    renderUsers = () => {
        return this.props.users.map(user => {
            return (
                <option 
                    key={user.id} 
                    value={user.id}
                    name={user.username}
                >
                {user.username}
                </option>
            )
        })
    }

    renderProjects = () => {
        return this.props.projects.map(project => {
            return <option key={project.id}>{project.title}</option>
            
        })
    }

    saveProjectIdToLocalState = (name) => {
        const { projects } = this.props;
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

    onSubmit = () => {
        const { username, project, projectId } = this.state;

        if (!username || !project) {
            this.setState({ notification: true });
        } else {
            this.setState({showModal: true});
            this.props.fetchProjectUsers(projectId);
        }
    }

    onConfirmProjectAssignment = () => {
        const { username, userId, project, projectId } = this.state;
        const { projectUsers } = this.props;

        const checkSelection = projectUsers.filter(entry => entry.projectID === projectId && entry.userID === userId);

        if (checkSelection.length !== 0) {
            this.setState ({
                notification: true, 
                warning: true,
                showModal: false
            })
        } else {
            this.props.assignProject({
                username: username,
                userId: userId,
                project: project,
                projectId: projectId,
            })

            this.resetState();
            document.location.reload();
        }
    }

    resetState = () => {
        this.setState({
            userId: '',
            username: '',
            role: '',
            showModal: false,
            notification: false
        })
    }

    render() {
        const { username, project, notification, showModal, warning } = this.state;
        
        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";


        return (
            <div>
                <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                    {
                        warning ?
                        <p>{username} is already assigned to {project}</p>
                        :
                        <p>You need to select a Project and a User</p> 
                    }
                    <div className="modal-btns">
                        <button className="btn2-main modal-btn btn-confirm" onClick={this.closeNotification}>
                            Ok
                        </button>
                    </div>
                </Modal>

                <Modal visibility={showHideModal} type="modal-container main scale-up-center">
                    <h2 className="header">Confirm Project assignment?</h2>
                    <div className="changes-details">
                        <h3 className="title">User</h3>
                        <p className="detail">{username}</p>
                        <h3 className="title">Project</h3>
                        <p className="detail">{project}</p>
                    </div>
                        <div className="modal-btns">
                            <button className="btn2-main modal-btn btn-cancel" onClick={this.closeModal}>
                                Cancel
                            </button>
                            <button className="btn2-main modal-btn btn-confirm" onClick={this.onConfirmProjectAssignment}>
                                Confirm
                            </button>

                        </div>
                </Modal>

                <main className="projects-main">
                    <div className="roles-title">
                        <p>Manage Project Users</p>
                    </div> 
                    <div className="roles-manage-container">
                        <div className="roles-column">
                            <label className="selection user-selection">
                                <p className="selection-title">Select 1 or more Users</p>
                                {/* <select multiple name="username" onChange={this.onChange}> */}
                                <select multiple onChange={this.setUsernameAndId}>
                                    {this.renderUsers()}
                                </select>
                            </label>
    
                            <div className="selection role-selection">
                                <label>
                                    <p className="selection-title">Select the Project to assign</p>
                                    <select name="project" onChange={this.onProjectSelection}>
                                        <option>--Select Project/None--</option>
                                        {this.renderProjects()}
                                    </select>
                                </label>
                                <div className="btn-role">
                                    <Button text="SUBMIT" onClick={this.onSubmit}/>
                                </div>
                            </div>
                        </div>
    
                        <div className="list-column"> 
                            {/* <ProjectsList2 /> */}
                            <AllProjectUsers />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        users: state.users.users,
        projects: state.projects.projects,
        projectUsers: state.users.projectUsers
    }
}

const mapDispatchToProps = { fetchUsers, fetchProjectUsers, assignProject }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAssign);