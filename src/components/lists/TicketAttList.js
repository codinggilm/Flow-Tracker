import React from 'react';
import List from '../layout/display/List';
import '../../scss/components/lists/TicketAttList.scss';

 
const TicketAttList = () => { 
	return (
		<div>
			<main className="tickets-att-list-main">
			<List 
                            listTitle="Ticket Attachments"
                            listDescription="All comments for this ticket"
                            titleGrid="tableList-titles comments"
                            stateObject={ticketComments}
                            allEntries={ticketComments.length} 
                            renderItems={(entriesStart, maxPerPage, searchfield) => 
                                this.renderComments(entriesStart, maxPerPage, searchfield)
                            } 
                        >
                            <p>Commenter</p>
                            <p>Message</p>
                            <p>Created</p>
                            <p>Delete</p>
                        </List>
				<div className="list-container">
					<header className="banner-container">
						<div className="list-banner">
							<p className="list-title">Ticket Attachments</p>
							<p className="list-detail">All files attached to this ticket</p>
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
								<p>File</p>
								<p>Uploader</p>
								<p>Notes</p>
								<p>Created</p>
							</header>
							<div className="tableList-details-container">
								<div className="tableList-row last-row">
									<p>No attachements to display</p>
								</div>
							</div>
							<div className="tableList-footer">
								<p>Showing 1 to 10 of 13 entries</p>
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

export default TicketAttList; 