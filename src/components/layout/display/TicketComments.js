import React from 'react';
import TicketCommentsList from '../../lists/TicketCommentsList';
import AddComment from './AddComment';
import '../../../scss/components/layouts/TicketComments.scss';

  
const TicketComments = () => {
	return (
		<div> 
			<main className="showcase-main">
				<div className="list-container">
                    <AddComment />
					<TicketCommentsList />
				</div>
			</main>
		</div>
	)
}

export default TicketComments; 