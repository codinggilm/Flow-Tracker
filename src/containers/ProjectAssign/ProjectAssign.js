import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, editUser } from '../../redux/actions';
import ProjectsList from '../../components/lists/ProjectsList';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/ProjectAssign.scss';
 
 
class ProjectAssign extends Component {

    state = {
        username: '',
        project: '',
        projectId: ''

    }

    componentDidMount = () => {
        this.props.fetchUsers();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    renderUsers = () => {
        return this.props.users.map(user => {
            return <option key={user.id}>{user.username}</option>
            
        })
    }

    renderProjects = () => {
        return this.props.projects.map(project => {
            return <option key={project.id}>{project.title}</option>
            
        })
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

    onAssignProject = () => {
        console.log(this.state)
        this.props.editUser({
            username: this.state.username,
            project: this.state.project,
            projectId: this.state.projectId,

        })
    }

    render() {
        return (
            <div>
                <main className="projects-main">
                    <div className="roles-title">
                        <p>Manage Project Users</p>
                    </div> 
                    <div className="roles-manage-container">
                        <div className="roles-column">
                            <label className="selection user-selection">
                                <p className="selection-title">Select 1 or more Users</p>
                                <select multiple name="username" onChange={this.onChange}>
                                    {this.renderUsers()}
                                    {/* <option>Joshua Mastertson</option>
                                    <option>Rebecca Abell</option>
                                    <option>Bobby Davis</option>
                                    <option>Jorgen Malakith</option>
                                    <option>Alexandre Plard</option>
                                    <option>Guillaume Croizon</option>
                                    <option>Brian Thomas</option> */}
                                </select>
                            </label>
    
                            <div className="selection role-selection">
                                <label>
                                    <p className="selection-title">Select the Project to assign</p>
                                    <select name="project" onChange={this.onProjectSelection}>
                                        <option>--Select Role/None--</option>
                                        {this.renderProjects()}
                                        {/* <option>Project Name</option>
                                        <option>Project Name</option>
                                        <option>Project Name</option>
                                        <option>Project Name</option> */}
                                    </select>
                                </label>
                                <div className="btn-role">
                                    <Button text="SUBMIT" onClick={this.onAssignProject}/>
                                </div>
                            </div>
                        </div>
    
                        <div className="list-column">
                            <ProjectsList />
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
        projects: state.projects.projects
    }
}

const mapDispatchToProps = { fetchUsers, editUser }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAssign);