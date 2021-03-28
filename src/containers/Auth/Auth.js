import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestLogin } from '../../redux/actions';
import Register from './Register';
import '../../scss/containers/Auth.scss';
 
class Auth extends Component {
    
    state = {
        isRegistered: true
    }
    // onSubmitSignIn = () => {
    //     this.props.onSignIn('home');
    // }

    registerMe = () => {
        this.setState({isRegistered: false})
    }
    
    haveAnAccount = () => {
        this.setState({isRegistered: true})
        // console.log('cock')
    }

    

    onRequestLogin = () => {
        this.props.requestLogin()
    }
    
    render() {
        return (
            <div>
            {
                !this.state.isRegistered ? <Register onHaveAccount={this.haveAnAccount}/>

                :

                <main className="auth-main">
                    <div className="auth-container">
                        <header>Flow Tracker</header>
                        <div className="login-details">
                            <div className="input email-input">
                                <i className="far fa-envelope"></i>
                                <input type="email"/>
                            </div>
                            <div className=" input password-input">
                                <i className="fas fa-lock"></i>
                                <input type="password"/>
                            </div> 
                        </div>        
                        {/* <button onClick={this.onSubmitSignIn}>SIGN IN</button> */}
                        <button onClick={this.onRequestLogin}>SIGN IN</button>
                        {/* <a href="/"><button>SIGN IN</button></a> */}
                        <div className="login-links">
                            <p>Forgot your <a href="/">Password?</a></p>
                            <p>Create an account? <Link to="" onClick={this.registerMe}>Sign Up</Link></p>
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