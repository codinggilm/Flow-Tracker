import React, { Component } from 'react';
import { fetchUsers, fetchProjectUsers, saveTotalEntries } from '../../redux/actions';
import List from '../layout/display/List'
import { connect } from 'react-redux';
import '../../scss/components/lists/ProjectUsersList.scss';


class ProjectUsersList2 extends Component {

    // state = {
    //     usersNumber: null
    // }

	componentDidMount = () => {
		this.props.fetchUsers();
		this.props.fetchProjectUsers(this.props.projectId);
	}

	


	renderProjectUsers = (entriesStart, maxPerPage, searchfield) => {
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
        this.props.saveTotalEntries(finalUsers.length)

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
        let { users, totalEntries} = this.props;

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
                            allEntries={totalEntries} 
                            renderItems={(entriesStart, maxPerPage, searchfield) => 
                                this.renderProjectUsers(entriesStart, maxPerPage, searchfield)
                            } 
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
        totalEntries: state.pagination.totalEntries
    }
}

const mapDispatchToProps = { fetchUsers, fetchProjectUsers, saveTotalEntries }
// const mapDispatchToProps = { fetchUsers, fetchProject, fetchProjectUsers }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUsersList2); 