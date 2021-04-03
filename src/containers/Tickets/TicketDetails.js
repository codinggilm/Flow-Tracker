import React from 'react'; 
import TicketShowcase from '../../components/layout/display/TicketShowcase';
// import TicketComments from '../../components/layout/display/TicketComments';
// import TicketHistory from '../../components/lists/TicketHistory';
// import TicketAttachments from '../../components/layout/display/TicketAttachments';
import TicketComments2 from '../../components/layout/display/TicketComments2';
import TicketHistory2 from '../../components/lists/TicketHistory2';
import TicketAttachments2 from '../../components/layout/display/TicketAttachments2';
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
                        {/* <TicketComments /> */}
                        <TicketComments2 />
                    </section>
                </div>
                <hr className="line"/>
                <div className="ticket-details-grid">
                    <section className="ticket-history-section">
                        {/* <TicketHistory /> */}
                        <TicketHistory2 />
                    </section>
                    <section className="ticket-att-section">
                        {/* <TicketAttachments /> */}
                        <TicketAttachments2 />
                    </section>
                </div>
			</main>
		</div>
	)
}

export default TicketDetails;