import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestLogout } from '../../../redux/actions'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../../scss/components/navigation/TopNav.scss';

 
class TopNav extends Component {
	
	render() { 
		const { currentUser } = this.props;
		return (
			<div>
				<div className="container-top-nav">
					<div className="top-nav-main">
						<div className="user-details">
							<p>Logged in as: {currentUser.role}</p>
						</div>
						<div className="top-nav-content">
							<Form inline>
								<FormControl type="text" placeholder="Search" className="mr-sm-2" />
								<i className="fas fa-search"></i>
								{/* <Button variant="outline-success">Search</Button> */}
							</Form>
							<i className="fas fa-dice-d6"></i>
							<div className="notification">
								<p>NOTIFICATIONS</p>
								<i className="fas fa-bell"></i>
								<div className="bello">0</div>
	
							</div>
							<div className="user-menu">
								<Dropdown>
									<Dropdown.Toggle variant="success" id="dropdown-basic">
										USER ACTIONS
										<i className="fas fa-user"></i>
									</Dropdown.Toggle>
									<Dropdown.Menu className="drop-menu">
										<Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
										<Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
										<Dropdown.Item 
											// href="#/action-3" 
											className="logout"
											onClick={()=>{
												window.localStorage.clear();
												this.props.requestLogout()
											}}
										>
										Log out
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUser: state.auth.currentUser,
	}
}

const mapDispatchToProps = { requestLogout }

export default connect(mapStateToProps, mapDispatchToProps)(TopNav); 