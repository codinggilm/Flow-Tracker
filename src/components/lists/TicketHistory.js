import React from 'react';
// import TableList from './TableList';
import '../../scss/components/lists/TicketHistory.scss';

 
const TicketHistory = () => {
	return (
		<div>
			<main className="ticket-history-main">
				<div className="list-container">
					<header className="banner-container">
						<div className="list-banner">
							<p className="list-title">Ticket History</p>
							<p className="list-detail">Complete history of this ticket</p>
						</div>
					</header>
					<div className="list-search">
						<div className="list-entries">
							<div className="entries-show">
								<p>show</p>
								<input type="number" defaultValue="10" className="small-input"/>
								<p>entries</p>
							</div>
							<div className="entries-search">
								<p>Search:</p>
								<input type="search"/>
							</div>
						</div>
					</div>
					<div className="list-details-container">
					<main className="tableList-container">
							<header className="tableList-titles">
								<p>Property</p>
								<p>Old Value</p>
								<p>New Value</p>
								<p>Date Changed</p>
							</header>
							<div className="tableList-details-container">
								<div className="tableList-row">
									<p>AssignedToUserId</p>
									<p>Daniel Dean</p>
									<p>Brian Thomas</p>
									<p>11/13/2019 11:30:52 PM</p>
								</div>
								<div className="tableList-row">
									<p>AssignedToUserId</p>
									<p>Daniel Dean</p>
									<p>Brian Thomas</p>
									<p>11/13/2019 11:30:52 PM</p>
								</div>
								<div className="tableList-row">
									<p>AssignedToUserId</p>
									<p>Daniel Dean</p>
									<p>Brian Thomas</p>
									<p>11/13/2019 11:30:52 PM</p>
								</div>
								<div className="tableList-row last-row">
									<p>AssignedToUserId</p>
									<p>Daniel Dean</p>
									<p>Brian Thomas</p>
									<p>11/13/2019 11:30:52 PM</p>
								</div>
							</div>
							<div className="tableList-footer">
								<p>Showing 1 to 4 of 4 entries</p>
								<div className="tableList-pagination">
									<p>Previous</p>
									<p className="page-number">1</p>
									<p className="page-number">2</p>
									<p>Next</p>
								</div>
							</div>
						</main>
					</div>
				</div>
			</main>
		</div>
	)
}

export default TicketHistory; 