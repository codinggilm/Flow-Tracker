import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestLogin } from '../../redux/actions';
import Register from './Register';
import '../../scss/containers/Auth.scss';
 
class Auth extends Component {
    
    state = {
        isRegistered: true,
        // email: '',
        username: '',
        password: ''
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    registerUser = () => {
        this.setState({isRegistered: false})
    }
    
    hasAccount = () => {
        this.setState({isRegistered: true})
    }

    
    onRequestLogin = () => {
        this.props.requestLogin(this.state);
        console.log(this.state)
    }
    
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
                                <input type="text" name="username" placeholder="type username.."/>
                            </div>
                            <div className=" input password-input">
                                <i className="fas fa-lock"></i>
                                <input type="password" name="password" onChange={this.onChange}/>
                            </div> 
                        </div>        
                        {/* <button onClick={this.onSubmitSignIn}>SIGN IN</button> */}
                        <button onClick={this.onRequestLogin}>SIGN IN</button>
                        {/* <a href="/"><button>SIGN IN</button></a> */}
                        <div className="login-links">
                            <p>Forgot your <a href="/">Password?</a></p>
                            <p>Create an account? <Link to="" onClick={this.registerUser}>Sign Up</Link></p>
                            <p>Sign in as a <a href="/">Demo User</a></p>
                        </div>
                    </div>
                </main>
            }
            </div>
        )
    } 
}


const mapDispatchToProps = { requestLogin }

export default connect(null, mapDispatchToProps)(Auth);