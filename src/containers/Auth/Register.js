import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { requestLogin } from '../../redux/actions';
import '../../scss/containers/Register.scss';
 
class Register extends Component {
    constructor(props){
        super(props)
    }

    state = {
        company: '',
        username: '',
        email: '',
        password: ''
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onRequestRegister = () => {
        console.log(this.state)
    }
    
    render() {
        return (
            <div>
                <main className="auth-main">
                    <div className="auth-container">
                        <header>Flow Tracker</header>
                        <div className="login-details">
                            <div className="input company-input" onChange={this.onChange}>
                                <i className="fas fa-building"></i>
                                <input type="text" name="company" placeholder="your company name.."/>
                            </div>
                            <div className="input username-input" onChange={this.onChange}>
                                <i className="fas fa-street-view"></i>
                                <input type="text" name="username" placeholder="type username.."/>
                            </div>
                            <div className="input email-input" onChange={this.onChange}>
                                <i className="far fa-envelope"></i>
                                <input type="email" name="email" placeholder="type email.."/>
                            </div>
                            <div className=" input password-input" onChange={this.onChange}>
                                <i className="fas fa-key"></i>
                                <input type="password" name="password" placeholder="pick a password.."/>
                            </div> 
                        </div>        
                        <button onClick={this.onRequestRegister}>REGISTER ME</button>
                        {/* <a href="/"><button>SIGN IN</button></a> */}
                        <div className="login-links">
                            <p>Forgot your <a href="/">Password?</a></p>
                            <p>Sign in as a <a href="/">Demo User</a></p>
                            <p><Link to="" onClick={this.props.onHaveAccount}>I already have an account</Link></p>
                        </div>
                    </div>
                </main>
            </div>
        )
    } 
}


// const mapDispatchToProps = { requestLogin }

export default connect()(Register);