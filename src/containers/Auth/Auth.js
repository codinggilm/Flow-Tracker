import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestLogin, demoLogin } from '../../redux/actions';
import Register from './Register';
import '../../scss/containers/Auth.scss';
 
class Auth extends Component {
    
    state = {
        isRegistered: true,
        // email: '',
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

    onDemoLogin = () => {
        this.props.demoLogin();
    };
    
    render() {
        return (
            <div>
            {
                !this.state.isRegistered ? <Register onHasAccount={this.hasAccount}/>

                :

                <main className="auth-main">
                    <div className="auth-container">
                        <header>Flow Tracker</header>
                        <div className="login-details">
                            {/* <div className="input email-input">
                                <i className="far fa-envelope"></i>
                                <input type="email" name="email" onChange={this.onChange}/>
                            </div> */}
                            <div className="input username-input" onChange={this.onChange}>
                                <i className="fas fa-street-view"></i>
                                <input type="text" name="username" placeholder="enter your username"/>
                            </div>
                            <div className=" input password-input">
                                <i className="fas fa-lock"></i>
                                <input type="password" name="password" placeholder="enter your password" onChange={this.onChange}/>
                            </div> 
                            {
                                this.props.wrongCredentials ? 
                                <p className="wrong-credentials">Wrong username or password.</p> : null
                            }        
                        </div>
                        <button onClick={this.onRequestLogin}>SIGN IN</button>
                        <div className="login-links">
                            <p>Sign in as a <Link to="/" onClick={this.onDemoLogin}>Demo User</Link></p>
                            <p>Forgot your <Link to="/">Password?</Link></p>
                            <p>Create an account? <Link to="/" onClick={this.registerUser}>Sign Up</Link></p>
                        </div>
                    </div>
                </main>
            }
            </div>
        )
    } 
};

const mapStateToProps = state => {
	return { 
		wrongCredentials: state.auth.wrongCredentials
	}
};

const mapDispatchToProps = { requestLogin, demoLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);