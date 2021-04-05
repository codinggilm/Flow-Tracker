import React, { Component } from 'react';
import '../../../scss/components/layouts/Modal.scss';

   
class Modal extends Component { 
    // constructor(props){
    //     super(props)
    // }

    render() {
        return (
            <div className={this.props.visibility}> 
                <div className="modal-main">
                    <div className={this.props.type}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;