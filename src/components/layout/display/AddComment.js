import React from 'react';
import Button from '../button/Button';
import '../../../scss/components/layouts/AddComment.scss';
 

const AddComment = () => {
	return (
		<div>
			<main className="add-comment-main">
                <p>Add a Comment?</p>
                <div className="enter-comment">
                    <input type="text"/>
                    <div className="button-container">
                        <Button text="ADD"/>
                    </div>
                </div>
			</main>
		</div>
	)
}

export default AddComment;