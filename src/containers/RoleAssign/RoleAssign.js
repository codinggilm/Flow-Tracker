import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, editUserRole, fetchTickets } from '../../redux/actions';
// import UsersList from '../../components/lists/UsersList';
import List from '../../components/layout/display/List';
import Button from '../../components/layout/button/Button';
import Modal from '../../components/layout/display/Modal'
import '../../scss/containers/RoleAssign.scss';
 
   
class RoleAssign extends Component {

    state = {
        userId: '',
        username: '',
        role: '',
        showModal: false,
        notification: false,
        warning: false,
        sameRole: false,
        unauthorized: false
    };

    componentDidMount = () => {
        const { currentUser } = this.props;
		this.props.fetchUsers(currentUser.companyId);
        this.props.fetchTickets(currentUser.companyId);
	};
 
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    closeNotification = () => {
        this.setState({ notification: false });
    };

    onSubmit = () => {
        const { username, role } = this.state;
        
        if (!username || !role) {
            this.setState({ notification: true })
        } else {
            this.setState({ showModal: true })
        }
    };

    onConfirmRole = () => {
        const { username, role } = this.state;
        const { users, tickets, currentUser } = this.props;
        const selectedUser = users.filter(user => user.username === username);
        const unavailable = tickets.filter(ticket => ticket.status === 'Open' && ticket.developer === selectedUser[0].username)

        if (unavailable.length !== 0) {
                this.setState ({
                notification: true, 
                warning: true,
                showModal: false
            })
        } else if (selectedUser[0].role === role) {
            this.setState ({
                notification: true, 
                sameRole: true,
                showModal: false,
            })
        } else if (currentUser.role !== 'Admin') {
            this.setState ({
                notification: true, 
                unauthorized: true,
                showModal: false,
            })
        } else {
            this.props.editUserRole({
                username: username,
                role: role,
                id: selectedUser[0].id
            })
            
            this.resetState();
            document.location.reload();
        }
        
    };

    resetState = () => {
        this.setState({
            userId: '',
            username: '',
            role: '',
            showModal: false,
            notification: false
        })
    };

    renderUsersSelection = () => {
        return this.props.users.map(user => {
            return <option key={user.id}>{user.username}</option>
            
        })
    };

    renderUsers = (entriesStart, maxPerPage, searchfield) => {
        let { users } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;
          
        let filteredList = users.filter(users => {
			return (
                users.username.toLowerCase().includes(filter) || users.email.toLowerCase().includes(filter) ||
                users.role.toLowerCase().includes(filter)
            )
		})

        return filteredList.slice(entriesStart, entriesEnd).map(user => {
            return (
                <div className="tableList-row users" key={user.id}>
					<p>{user.username}</p>
					<p>{user.email}</p>
					<p>{user.role}</p>
				</div>
            )
        })
    };

    render() {
        const { users } = this.props;
        const { username, role, notification, showModal, warning, unauthorized, sameRole } = this.state;

        const showHideModal = showModal ? "display-block" : "display-none";
        const showHideNotification = notification ? "display-block" : "display-none";

        return (
            <div>

                <Modal visibility={showHideNotification} type="modal-container notification slide-bottom">
                    {
                        warning ?
                        <div>
                            <p>{username} is currently assigned to an open Ticket. You cannot change this user's role right now.</p>
                            <br/>
                            <p>Please assign a new developer to {username}'s open Ticket(s) before proceeding.</p>
                        </div>
                        :
                        sameRole ? 
                        <p>{username} is already a {role}.</p>
                        :
                        unauthorized ? 
                        <p>Only Admins can assign a Role</p> 
                        :
                        <p>You need to select a User and a Role</p> 

                    }
                    <div className="modal-btns">
                        <button className="btn2-main modal-btn btn-confirm" onClick={this.closeNotification}>
                            Ok
                        </button>
                    </div>
                </Modal>

                <Modal visibility={showHideModal} type="modal-container main scale-up-center">
                    <h2 className="header">Confirm role assignment?</h2>
                    <div className="changes-details">
                        <h3 className="title">User</h3>
                        <p className="detail">{username}</p>
                        <h3 className="title">New role</h3>
                        <p className="detail">{role}</p>
                    </div>
                        <div className="modal-btns">
                            <button className="btn2-main modal-btn btn-cancel" onClick={this.closeModal}>
                                Cancel
                            </button>
                            <button className="btn2-main modal-btn btn-confirm" onClick={this.onConfirmRole}>
                                Confirm
                            </button>

                        </div>
                </Modal>

                <main className="roles-main">
                    <div className="roles-title">
                        <p>Manage User Roles</p>
                    </div> 
                    <div className="roles-manage-container">
                        <div className="roles-column">
                            <label className="selection user-selection">
                                <p className="selection-title">Select 1 or more Users</p>
                                <select multiple name="username" onChange={this.onChange}>
                                    {this.renderUsersSelection()}
                                </select>
                            </label>
    
                            <div className="selection role-selection">
                                <label>
                                    <p className="selection-title">Select the Role to assign</p>
                                    <select name="role" onChange={this.onChange}>
                                        <option>--Select Role--</option>
                                        <option>None</option>
                                        <option>Admin</option>
                                        <option>Project Manager</option>
                                        <option>Developer</option>
                                        <option>Submitter</option>
                                    </select>
                                </label>
                                <div className="btn-role">
                                    <Button text="SUBMIT" onClick={this.onSubmit}/>
                                </div>
                            </div>
                        </div>
    
                        <div className="list-column"> 
                            <List 
                                listTitle="Your Personnel"
                                listDescription="All the users in your database"
                                titleGrid="tableList-titles users"
                                stateObject={users}
                                allEntries={users.length} 
                                renderItems={(entriesStart, maxPerPage, searchfield) => 
                                    this.renderUsers(entriesStart, maxPerPage, searchfield)
                                }
                            >
                                <p>User Name</p>
                                <p>Email</p>
                                <p>Role</p>
                            </List>
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
        tickets: state.tickets.tickets,
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = { fetchUsers, editUserRole, fetchTickets }

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssign);