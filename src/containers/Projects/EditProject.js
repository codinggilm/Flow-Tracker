import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editProject, deleteProject } from '../../redux/actions'
import Button from '../../components/layout/button/Button';
import '../../scss/containers/EditProject.scss';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';

 
class EditProject extends Component {

    state = {
        title: '',
        description: ''
    }

    onTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    onDescriptionChange = (event) => {
        this.setState({description: event.target.value})
    }

    onEditProject = () => {
        this.props.editProject(
            this.props.projectId, {
                title: this.state.title,
                description: this.state.description
            }
        )
    }

    onDeleteProject = () => {
        console.log(this.props.projectId)
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
                                        <input type="text" className="row-input" onChange={this.onTitleChange}/>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Description</p>
                                        <input type="text" className="row-input" onChange={this.onDescriptionChange}/>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Assigned Personnel</p>
                                        <div className="selection">
                                            <select>
                                                <option >Joshua Mastertson</option>
                                                <option>Rebecca Abell</option>
                                                <option>Bobby Davis</option>
                                                <option>Jorgen Malakith</option>
                                                <option>Alexandre Plard</option>
                                                <option>Guillaume Croizon</option>
                                                <option>Brian Thomas</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Actions</p>
                                        <div className="btn-actions">
                                            {/* <button className="btn-add-user">ADD</button> */}
                                            <button className="btn-del-user">REMOVE USER</button>
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
                                        onClick={this.onDeleteProject}
                                    >DELETE PROJECT
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
        projectId: state.projects.projectId
    }
}

const mapDispatchToProps = { editProject, deleteProject }

export default connect(mapStateToProps, mapDispatchToProps)(EditProject); 