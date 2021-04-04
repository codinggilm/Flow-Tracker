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
            <div className={this.props.visibility}> 
                <div className="modal-main">
                    <div className={this.props.style}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;