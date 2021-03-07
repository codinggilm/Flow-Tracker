import React from 'react';
import Button from '../button/Button';
import '../../../scss/components/layouts/AddAttachment.scss';
 

const AddAttachment = () => {
	return (
		<div>
			<main className="add-attachment-main">
                <p className="section-title">Add an Attachment?</p>
                <div className="add-att-grid">
                    <div className="att-upload">
                        <p className="att-titles">Select File</p>
                        <div className="btn-upload">
                            <i className="fas fa-cloud-upload-alt"></i>
                            <p>UPLOAD FILE</p>
                        </div>
                    </div>
                    <div className="att-description">
                        <p className="att-titles">Add Description</p>
                        <input type="text"/>
                    </div>
                    <div className="button-container">
                        <Button text="ADD"/>
                    </div>
                </div>
			</main>
		</div>
	)
}

export default AddAttachment;