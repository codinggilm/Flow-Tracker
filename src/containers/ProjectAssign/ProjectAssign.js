import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, assignProject } from '../../redux/actions';
import ProjectsList2 from '../../components/lists/ProjectsList2';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/ProjectAssign.scss';
 
 
class ProjectAssign extends Component {

    state = {
        username: '',
        userId: '',
        project: '',
        projectId: ''

    }

    componentDidMount = () => {
        this.props.fetchUsers();
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
        this.props.assignProject({
            username: this.state.username,
            userId: this.state.userId,
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
                                    <Button text="SUBMIT" onClick={this.onAssignProject}/>
                                </div>
                            </div>
                        </div>
    
                        <div className="list-column">
                            <ProjectsList2 />
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

const mapDispatchToProps = { fetchUsers, assignProject }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAssign);