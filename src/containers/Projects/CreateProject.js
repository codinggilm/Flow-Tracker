import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProject } from '../../redux/actions';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/CreateProject.scss';

   
class CreateProject extends Component { 
 
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


    onCreateProject = (event) => {
        event.preventDefault();
        this.props.createProject({
            title: this.state.title,
            description: this.state.description
        });
    }



    render() {
        return (
            <div> 
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
                                        <input type="text" className="row-input" onChange={this.onTitleChange}/>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Project Description</p>
                                        <input type="text" className="row-input" onChange={this.onDescriptionChange}/>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Available Personnel</p>
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
                                        <p className="row-title">Action</p>
                                        <div className="btn-actions">
                                            <button className="btn-add-user">ADD USER TO PROJECT</button>
                                            {/* <button className="btn-del-user">REMOVE USER</button> */}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="nav-links">
                                    <Link to="/projects">Back to List</Link>
                                    <div className="btn-container">
                                        <Button 
                                            text="CREATE PROJECT"
                                            onClick={this.onCreateProject}  
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

// const mapStateToProps = (state) => {
// 	return { project: state.project }
// }

const mapDispatchToProps = { createProject }

export default connect(null, mapDispatchToProps)(CreateProject);
    // {addProject: addProject})
    // {addProject})
    // (CreateProject);