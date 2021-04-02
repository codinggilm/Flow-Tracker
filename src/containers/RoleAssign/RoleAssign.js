import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, editUserRole } from '../../redux/actions';
// import UsersList from '../../components/lists/UsersList';
import List from '../../components/layout/display/List';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/RoleAssign.scss';
 
  
class RoleAssign extends Component {

    state = {
        userId: '',
        username: '',
        role: ''
    }

    componentDidMount = () => {
		this.props.fetchUsers();
	}
 
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    renderUsersSelection = () => {
        return this.props.users.map(user => {
            return <option key={user.id}>{user.username}</option>
            
        })
    }

    onChangingUserRole = () => {
        const selectedUser = this.props.users.filter(user => user.username === this.state.username)
        this.props.editUserRole({
            username: this.state.username,
            role: this.state.role,
            id: selectedUser[0].id
        })
    }

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
    }

    render() {
        const { users } = this.props;

        return (
            <div>
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
                                        <option>--Select Role/None--</option>
                                        <option>Admin</option>
                                        <option>Project Manager</option>
                                        <option>Developer</option>
                                        <option>Submitter</option>
                                    </select>
                                </label>
                                <div className="btn-role">
                                    <Button text="SUBMIT" onClick={this.onChangingUserRole}/>
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
        users: state.users.users
    }
}

const mapDispatchToProps = { fetchUsers, editUserRole }

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssign);