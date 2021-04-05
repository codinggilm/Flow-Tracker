import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchProjects, fetchTickets, fetchAllProjectUsers } from '../../redux/actions';
import List from '../layout/display/List';
import Modal from '../layout/display/Modal';
// import '../../scss/components/lists/ProjectUsersList2.scss';


class ProjectUsers extends Component {
    
    state = {
        username: '',
        userId: '',
        project: '',
        showModal: false,
        notification: false,
        warning: false

    }
    

	componentDidMount = () => {
		this.props.fetchUsers();
		this.props.fetchProjects();
        this.props.fetchTickets();
        this.props.fetchAllProjectUsers();
	}

    closeModal = () => {
        this.setState({showModal: false});
    }

    closeNotification = () => {
        this.setState({notification: false});
    }

    removeUser = (userID, username, role, project, projectID) => {
        const { tickets } =  this.props;
        
        const unavailable = tickets.filter(
            ticket => ticket.status === 'Open' && ticket.developer === username && 
            ticket.projectId === projectID
        )
        
        if (unavailable.length !== 0) {
            this.setState({notification: true})
        } else {
            this.setState({
                username: username,
                project: project, 
                userId: userID,
                showModal: true
            })
        }

    } 


	renderAllProjectUsers = (entriesStart, maxPerPage, searchfield) => {
		let { allProjectUsers } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;

        let filteredList = allProjectUsers.filter(users => {
			return (
                users.username.toLowerCase().includes(filter) || users.project.toLowerCase().includes(filter) ||
                users.role.toLowerCase().includes(filter) 
            )
		}) 

        return filteredList.slice(entriesStart, entriesEnd).map(user => {
            const {username, userID, project, projectID, role } = user;
            return (
                <div className="tableList-row all-project-users" key={(Math.random())}>
                    <p>{username}</p>
                    <p>{project}</p>
                    <p>{role}</p>
                    <button 
                        onClick={()=> this.removeUser(userID, username, role, project, projectID)}
                    >Remove user
                    </button>
                </div>
            )
		})
	}

	


	
	render() {
        let { allProjectUsers } = this.props;
        const { username, project, role, notification, showModal, warning } = this.state;
        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";

		return (
			<div>

                <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                    {
                        notification ?
                        <div>
                            {/* <p>{username} is assigned to an open ticket on this project</p>
                            <br/> */}
                            <p>You cannot remove a user currently assigned to an open ticket on a project</p>
                        </div>
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
                    <h2 className="header">Are you sure you want to remove {username} from this project?</h2>
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

                <main className="project-users-list-main">
                    <List 
                        listTitle="Projects Users"
                        listDescription="All Users currently assigned to a Project"
                        titleGrid="tableList-titles all-project-users"
                        stateObject={allProjectUsers}
                        allEntries={allProjectUsers.length} 
                        // allEntries={users.length} 
                        renderItems={(entriesStart, maxPerPage, searchfield) => 
                            this.renderAllProjectUsers(entriesStart, maxPerPage, searchfield)
                        } 
                    >
                        <p>Username</p>
                        <p>Project</p>
                        <p>Role</p>
                        <p>Action</p>
                    </List>
                </main>
				
			</div>
		)
	}
}

const mapStateToProps = state => {
    return { 
        users: state.users.users,
        tickets: state.tickets.tickets,
        projects: state.projects.projects,
        allProjectUsers: state.users.allProjectUsers,
		// projectId: state.projects.projectId,
        // totalProjectUsers: state.pagination.totalProjectUsers,
        
    }
}

const mapDispatchToProps = { fetchUsers, fetchTickets, fetchProjects, fetchAllProjectUsers }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUsers); 