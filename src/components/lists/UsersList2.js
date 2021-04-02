import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actions';
import '../../scss/components/lists/UsersList2.scss';

 
class UsersList2 extends Component {

	componentDidMount = () => {
		this.props.fetchUsers();
	}

	renderUsers = () => {
        return this.props.users.map(user => {
            return (
                <div className="tableList-row" key={user.id}>
					<p>{user.username}</p>
					<p>{user.email}</p>
					<p>{user.role}</p>
				</div>
            )
        })
    }

	render() {
		return (
			<div>
				<main className="list-main">
					<div className="list-container">
						<header className="banner-container">
							<div className="list-banner">
								<p className="list-title">Your Personnel</p>
								<p className="list-detail">All the user in your database</p>
							</div>
						</header>
						<div className="list-search">
							<div className="list-entries">
								<div className="entries-show">
									<p>show</p>
									<input type="number" defaultValue="10" className="small-input"/>
									<p>entries</p>
								</div>
								<div className="entries-search">
									<p>Search:</p>
									<input type="search"/>
								</div>
							</div>
						</div>
						<div className="list-details-container">
						<main className="tableList-container">
								<header className="tableList-titles">
									<p>User Name</p>
									<p>Email</p>
									<p>Role</p>
								</header>
								<div className="tableList-details-container">
									{this.renderUsers()}
								</div>
								<div className="tableList-footer">
									<p>Showing 1 to 10 of 13 entries</p>
									<div className="tableList-pagination">
										<p>Previous</p>
										<p className="page-number">1</p>
										<p className="page-number">2</p>
										<p>Next</p>
									</div>
								</div>
							</main>
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

const mapDispatchToProps = { fetchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(UsersList2); 