import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { createProject, fetchUsers } from '../../redux/actions';

// import Button from '../../components/layout/button/Button';
import '../../../scss/components/layouts/Modal.scss';

   
class Modal extends Component { 
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className={this.props.style}> 
                <div className="modal-main">
                    <div className="modal-container">
                        <h1>{this.props.title}</h1>
                        <button onClick={this.props.exitModal}>EXIT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;