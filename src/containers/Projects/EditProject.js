import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProject, editProject, deleteProject } from '../../redux/actions'
import Button from '../../components/layout/button/Button';
import '../../scss/containers/EditProject.scss';

 
 
class EditProject extends Component {

    state = {
        title: this.props.project.title,
        description: this.props.project.description,
        // projectId: this.props.projectId,
        userID: '',
        userToRemove: null
    }

    componentDidMount = () => {
        this.props.fetchProject(this.props.projectId); 
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    renderAssignedUsers = () => {
        // const users = this.props.users.filter(user => user.projectId === this.props.projectId);
        const users = this.props.projectUsers;
        return users.map(user => {
            return <option value={user.userID} key={user.userID}>{user.username}</option>
        })
    }

    onSelectingUser = (event) => {
        this.setState({ userID: parseInt(event.target.value) })
    }

    removeUser = () => {
        this.setState({userToRemove: this.state.userID})
    }

    onEditProject = () => {
        // console.log(this.state)
        this.props.editProject({
            title: this.state.title,
            description: this.state.description,
            projectId: this.props.projectId,
            userToRemove: this.state.userToRemove
        })
    } 

    onDeleteProject = () => {
        this.props.deleteProject(this.props.projectId)
    }

    render() {
        return (
            <div> 
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
                                                onClick={()=>this.removeUser()}>REMOVE USER
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
                                            onClick={this.onEditProject}
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
        projectId: state.projects.projectId,
        users: state.users.users,
        projectUsers: state.users.projectUsers
    }
}

const mapDispatchToProps = { fetchProject, editProject, deleteProject }

export default connect(mapStateToProps, mapDispatchToProps)(EditProject); 