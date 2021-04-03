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
        username: '',
        userId: '',
        showModal: false
    }

    // componentDidMount = () => {
    //     this.props.fetchUsers()
    // }

    renderUsersList = () => {
        return this.props.users.map(user => {
           return <option key={user.id}>{user.username}</option>
        })
    }


    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    addUser = () => {
        let user = this.props.users.filter(user => user.username === this.state.username);
        let id = user[0].id;
        this.setState({ 
            userAdded: this.state.username,
            userId: id 
        })
    }

    closeModal = () => {
        this.setState({showModal: false})
        console.log(this.state)
    }

    onCreateProject = () => {
        this.setState({showModal: true})
        // console.log(this.state)
        // this.props.createProject({
        //     title: this.state.title,
        //     description: this.state.description,
        //     userAdded: this.state.userAdded,
        //     userId: this.state.userId
        // });
    }



    render() {
        const showHideClassName = this.state.showModal ? "display-block" : "display-none";
        
        return (
            <div> 

               
                <Modal 
                    exitModal={this.closeModal} 
                    style={showHideClassName}
                    title="Confirm changes?"

                />
 
            
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
                                        <input type="text" className="row-input" name="title" onChange={this.onChange}/>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Project Description</p>
                                        <input type="text" className="row-input" name="description" onChange={this.onChange}/>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">Available Personnel</p>
                                        <div className="selection">
                                            {/* <select name="developer" onChange={this.onChange}> */}
                                            <select name="username" onChange={this.onChange}>
                                                <option>--Select User-- </option>
                                                {this.renderUsersList()}
                                            </select>
                                        </div> 
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">Action</p>
                                        <div className="btn-actions">
                                            <button 
                                                className="btn-add-user"
                                                // name="username" 
                                                onClick={this.addUser}
                                                // onChange={this.onChange}
                                            >
                                            ADD USER TO PROJECT
                                            </button>
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

const mapStateToProps = (state) => {
	return { 
        // project: state.project,
        users: state.users.users 
    }
}

const mapDispatchToProps = { createProject, fetchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);