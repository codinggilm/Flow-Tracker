import React from 'react';
import TicketShowcase from '../../components/layout/display/TicketShowcase';
import TicketComments from '../../components/layout/display/TicketComments';
// import Button from '../../components/layout/button/Button';
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
                    <section className="ticket-history-section"></section>
                    <section className="ticket-att-section"></section>
                </div>
			</main>
		</div>
	)
}

export default TicketDetails;