import React from 'react';
import '../../scss/containers/Auth.scss';
 
const Auth = () => { 
	return (
		<div>
			<main className="auth-main">
                <div className="auth-container">
				    <header>Flow Tracker</header>
                    <div className="login-details">
                        <div className="input email-input">
                            <i class="far fa-envelope"></i>
                            <input type="email"/>
                        </div>
                        <div className=" input password-input">
                            <i class="fas fa-lock"></i>
                            <input type="password"/>
                        </div>
                    </div>        
                    <button>SIGN IN</button>
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

export default Auth;