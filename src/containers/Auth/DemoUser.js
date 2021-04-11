import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestLogin } from '../../redux/actions';
import Register from './Register';
import '../../scss/containers/Auth.scss';
 
class DemoUser extends Component {
    
    state = {
        isRegistered: true,
        username: '',
        password: '',
        demoAccount: false
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    registerUser = () => {
        this.setState({ isRegistered: false })
    };
    
    hasAccount = () => {
        this.setState({ isRegistered: true })
    };

    
    onRequestLogin = () => {
        this.props.requestLogin(this.state);
    };
    
    render() {
        return (
            <div>
                <main className="auth-main">
                    <div className="auth-container">
                        <header>Please select the Role of your Demo Account.</header>
                        <p>And Admin can do everything, see everything</p>
                        <p>A Project Manager can assign users to Projects, and see all the projects and Tickets </p>
                        <p>A Developer can change a Ticket's status, </p>
                        <p>And Admin can do everything, see everything</p>
                        <p>Your Role will be set to Admin, enabling you to do and see anything without the restrictions that other Roles have.</p>
                        
                    </div>
                </main>
            </div>
        )
    } 
};

const mapStateToProps = state => {
	return { 
		wrongCredentials: state.auth.wrongCredentials
	}
};

const mapDispatchToProps = { requestLogin };

export default connect(mapStateToProps, mapDispatchToProps)(DemoUser);