import React, { Component } from 'react';
import { fetchUsers, fetchProjectUsers, saveTotalProjectUsers } from '../../redux/actions';
import List from '../layout/display/List'
import { connect } from 'react-redux';
import '../../scss/components/lists/ProjectUsersList2.scss';


class ProjectUsersList2 extends Component {

    

	componentDidMount = () => {
		this.props.fetchUsers();
		this.props.fetchProjectUsers(this.props.projectId);
	}


	renderProjectUsers = (entriesStart, maxPerPage, searchfield) => {
	// renderProjectUsers = () => {
		// let { users, entriesStart, maxPerPage, searchfield } = this.props;
		let { users } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;

		// Loop through project users and extract ids
		let projectUsers = this.props.projectUsers;

		let projectUsersIds =[];
		for (let i=0; i<projectUsers.length; i++) {
			projectUsersIds.push(projectUsers[i].userID)
		} 

		// Match project users IDs with Users
		let finalUsers = users.filter(user => projectUsersIds.includes(user.id));
        // this.setState({usersNumber: finalUsers.length})
        this.props.saveTotalProjectUsers(finalUsers.length)

        let filteredList = finalUsers.filter(users => {
			return (
                users.username.toLowerCase().includes(filter) || users.email.toLowerCase().includes(filter) ||
                users.role.toLowerCase().includes(filter) 
            )
		}) 

		// return finalUsers.map(user => {
        return filteredList.slice(entriesStart, entriesEnd).map(user => {
            return (
                <div className="tableList-row project-users" key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            )
		})
	}

	


	
	render() {
        let { users, totalProjectUsers} = this.props;

		return (
			<div>
				{/* {
					this.props.project ? 

					<div>
						FETCHING DETAILS...
					</div>
					 
					: */}

					<main className="project-users-list-main">
                        <List 
                            listTitle="Assigned Personnel"
                            listDescription="Current Users assigned to this Project"
                            titleGrid="tableList-titles project-users"
                            stateObject={users}
                            allEntries={totalProjectUsers} 
                            // allEntries={users.length} 
                            renderItems={(entriesStart, maxPerPage, searchfield) => 
                                this.renderProjectUsers(entriesStart, maxPerPage, searchfield)
                            } 
                            // renderItems={this.renderProjectUsers} 
                        >
                            <p>User Name</p>
                            <p>Email</p>
                            <p>Role</p>
                        </List>
					</main>
				{/* } */}
				
			</div>
		)
	}
}

const mapStateToProps = state => {
    return { 
        users: state.users.users,
        projectUsers: state.users.projectUsers,
		projectId: state.projects.projectId,
        totalProjectUsers: state.pagination.totalProjectUsers,
        // entriesStart: state.pagination.receivedProps.entriesStart,
        // maxPerPage: state.pagination.receivedProps.maxPerPage,
        // searchfield: state.pagination.receivedProps.searchfield
        
    }
}

const mapDispatchToProps = { fetchUsers, fetchProjectUsers, saveTotalProjectUsers }
// const mapDispatchToProps = { fetchUsers, fetchProject, fetchProjectUsers }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUsersList2); 