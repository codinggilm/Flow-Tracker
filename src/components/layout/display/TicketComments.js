import React from 'react';
// import TicketCommentsList from '../../lists/TicketCommentsList';
import TicketCommentsList2 from '../../lists/TicketCommentsList2';
import AddComment from './AddComment';
import '../../../scss/components/layouts/TicketComments.scss';

   
const TicketComments = () => {
	return (
		<div> 
			<main className="showcase-main">
				<div className="list-container">
                    <AddComment />
					{/* <TicketCommentsList /> */}
					<TicketCommentsList2 />
				</div>
			</main>
		</div>
	)
}

export default TicketComments; 