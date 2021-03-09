import React, { Component } from 'react';
import '../../scss/containers/Auth.scss';
 
class Auth extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         signedIn: ''
    //     }
    // }

    onSubmitSignIn = () => {
        this.props.onSignIn('home');
    }
    
    render() {
        return (
            <div>
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
                        <a href="/"><button>SIGN IN</button></a>
                        <div className="login-links">
                            <p>Forgot your <a href="/">Password?</a></p>
                            <p>Create an account? <a href="/">Sign Up</a></p>
                            <p>Sign in as a <a href="/">Demo User</a></p>
                        </div>
                    </div>
                </main>
            </div>
        )
    } 
}

export default Auth;