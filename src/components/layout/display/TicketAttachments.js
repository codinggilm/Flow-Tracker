import React from 'react';
// import TicketCommentsList from '../../lists/TicketCommentsList';
import AddAttachment from './AddAttachment';
import TicketAttList from '../../lists/TicketAttList';
import '../../../scss/components/layouts/TicketComments.scss';

  
const TicketAttachments = () => {
	return (
		<div> 
			<main className="showcase-main">
				<div className="list-container">
                    <AddAttachment />
					<TicketAttList />
				</div>
			</main>
		</div>
	)
}

export default TicketAttachments; 