import React, { Component } from 'react';
import { fetchUsers, fetchProjectUsers, saveTotalProjectUsers } from '../../redux/actions';
import List from '../layout/display/List'
import { connect } from 'react-redux';
import '../../scss/components/lists/ProjectUsersList.scss';


class ProjectUsersList extends Component {

    

	componentDidMount = () => {
		this.props.fetchUsers(this.props.currentUser.companyId);
		this.props.fetchProjectUsers(this.props.projectId);
	}


	renderProjectUsers = (entriesStart, maxPerPage, searchfield) => {
		
		let { users, projectUsers } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;
		let projectUsersIds =[];

		for (let i=0; i<projectUsers.length; i++) {
			projectUsersIds.push(projectUsers[i].userID)
		} 

		let currentProjectUsers = users.filter(user => projectUsersIds.includes(user.id));
        
		this.props.saveTotalProjectUsers(currentProjectUsers.length);

        let filteredList = currentProjectUsers.filter(users => {
			return (
                users.username.toLowerCase().includes(filter) || users.email.toLowerCase().includes(filter) ||
                users.role.toLowerCase().includes(filter) 
            )
		}) 

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
					>
						<p>User Name</p>
						<p>Email</p>
						<p>Role</p>
					</List>
				</main>
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
		currentUser: state.auth.currentUser   
    }
}

const mapDispatchToProps = { fetchUsers, fetchProjectUsers, saveTotalProjectUsers }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectUsersList); 