import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, registerSuccess } from '../../redux/actions';
import Modal from '../../components/layout/display/Modal'
// import { requestLogin } from '../../redux/actions';
import '../../scss/containers/Register.scss';
 
class Register extends Component {

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
        this.props.createUser(this.state);
    }
    
    render() {
        const { showModal, existingEmail, existingCompany, registerSuccess } = this.props;
        const showHideModal = showModal ? "display-block" : "display-none";

        return (
            <div>

                <Modal visibility={showHideModal} type="modal-container main scale-up-center">
                    <h2 className="header">Welcome to Flow Tracker!</h2>
                    <div className="changes-details">
                        {
                            existingCompany ? 

                            <div>
                                <p>You are joining an existing company's account, so you will not have a default Role.</p>
                                <br/>
                                <p>Please contact your Admin to have a Role assigned to you and get started.</p>
                            </div>
                            :
                            <div>
                                <p>Thank you for registering. As this is a new company, your Role will be set to Admin by default.</p>
                                <br/>
                                <p>You can now start creating Projects, Tickets, and you can assign Roles to future Users who register under your company.</p>
                            </div>
                        }

                    </div>
                        <div className="modal-btns">
                            <button className="btn2-main modal-btn btn-confirm" onClick={registerSuccess}>
                                Ok
                            </button>
                        </div>
                </Modal>
                
                <main className="register-main">
                    <div className="auth-container">
                        <header>Flow Tracker</header>
                        <div className="welcome-signup">
                            <p>Welcome!</p>
                            <p>Fill in the form below to get started</p>
                        </div>
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
                                {
                                    existingEmail? <p className="email-warning">Email already in use. Please use another address.</p> : null
                                }
                            </div>
                            <div className=" input password-input" onChange={this.onChange}>
                                <i className="fas fa-key"></i>
                                <input type="password" name="password" placeholder="pick a password.."/>
                            </div> 
                        </div>        
                        <button onClick={this.onRequestRegister}>REGISTER ME</button>
                        <div className="login-links">
                            <p>Forgot your <a href="/">Password?</a></p>
                            <p>Sign in as a <a href="/">Demo User</a></p>
                            <p><Link to="" onClick={this.props.onHasAccount}>I already have an account</Link></p>
                        </div>
                    </div>
                </main>
            </div>
        )
    } 
}

const mapStateToProps = state => {
	return { 
		existingEmail: state.auth.existingEmail,
		existingCompany: state.auth.existingCompany,
		showModal: state.auth.showModal,
		currentUser: state.auth.currentUser
	}
}


const mapDispatchToProps = { createUser, registerSuccess }

export default connect(mapStateToProps, mapDispatchToProps)(Register);