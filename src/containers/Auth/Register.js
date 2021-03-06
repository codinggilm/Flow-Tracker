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
        password: '',
        incomplete: false
    }

    onChange = (event) => {
        this.setState({ 
            [event.target.name]: event.target.value,
            incomplete: false
        })
    }

    onRequestRegister = () => {
        const { company, username, email, password } = this.state;

        if (!company || !username || !email || !password) {
            this.setState({ incomplete: true });
        } else {
            this.props.createUser(this.state);
        }
    }
    
    render() {
        const { showModal, existingEmail, existingCompany, registerSuccess } = this.props;
        const showHideModal = showModal ? "display-block" : "display-none";

        return (
            <div>

                <Modal visibility={showHideModal} type="modal-container new-user scale-up-center">
                    <h2 className="header">Welcome to Flow Tracker!</h2>
                    <div className="changes-details">
                        {
                            existingCompany ? 

                            <div>
                                <p>You are joining an existing company's account, so you will not get a default Role rigth away.</p>
                                <br/>
                                <p>Please ask your Admin to get a Role assigned to your profile and get started.</p>
                            </div>
                            :
                            <div>
                                <p>Thank you for registering. Your account is under a new company, so your Role will be set to Admin by default.</p>
                                <br/>
                                <p>You can now start creating Projects, Tickets, and you can assign Roles to future Users who register under your company.</p>
                                <br/>
                                <p>You are the first User so there won't be any data to display yet, or users to assign to Projects and Tickets. Feel free to create more Users and play around with Flow Tracker!</p>
                                <br/>
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
                                <input type="text" name="company" placeholder="your company name"/>
                            </div>
                            <div className="input username-input" onChange={this.onChange}>
                                <i className="fas fa-street-view"></i>
                                <input type="text" name="username" placeholder="type your username"/>
                            </div>
                            <div className="input email-input" onChange={this.onChange}>
                                <i className="far fa-envelope"></i>
                                <input type="email" name="email" placeholder="your email"/>
                                {
                                    existingEmail? <p className="email-warning">Email already in use. Please use another address.</p> : null
                                }
                            </div>
                            <div className=" input password-input" onChange={this.onChange}>
                                <i className="fas fa-key"></i>
                                <input type="password" name="password" placeholder="type your password"/>
                            </div>
                            {
                                this.state.incomplete ? 
                                <p className="incomplete">Please fill all fiels before proceeding.</p> : null
                            }
                        </div>        
                        <button onClick={this.onRequestRegister}>REGISTER ME</button>
                        <div className="login-links">
                            <p>Forgot your <Link to="/">Password?</Link></p>
                            <p>Sign in as a <Link to="/">Demo User</Link></p>
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