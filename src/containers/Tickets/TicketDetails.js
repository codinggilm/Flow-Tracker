import React from 'react'; 
import TicketShowcase from '../../components/layout/display/TicketShowcase';
import TicketComments from '../../components/layout/display/TicketComments';
import TicketAttachments from '../../components/layout/display/TicketAttachments';
import TicketHistory from '../../components/lists/TicketHistory';
import '../../scss/containers/TicketDetails.scss';
 
  
const TicketDetails = () => {
	return (
		<div> 
			<main className="ticket-details-main">
                <div className="ticket-details-grid">
                    <section className="details-section">
                        <TicketShowcase />
                    </section>
                    <section className="ticket-comments-section">
                        <TicketComments />
                    </section>
                </div>
                <hr className="line"/>
                <div className="ticket-details-grid">
                    <section className="ticket-history-section">
                        <TicketHistory />
                    </section>
                    <section className="ticket-att-section">
                        <TicketAttachments />
                    </section>
                </div>
			</main>
		</div>
	)
}

export default TicketDetails;