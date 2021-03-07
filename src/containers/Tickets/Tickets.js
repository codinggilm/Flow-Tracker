import React from 'react';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/Tickets.scss';

  
const Tickets = () => {
	return (
		<div>
            <main className="tickets-container">
                <header className="ticket-create">
                    <a href="/createticket"><Button text="CREATE NEW TICKET"/></a>
                </header>
                <div className="tickets-main">
                    <div className="list-container">
                        <header className="banner-container">
                            <div className="list-banner"> 
                                <p className="list-title">Your Tickets</p>
                                <p className="list-detail">All the Tickets in the database.</p>
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
                                    <p>Title</p>
                                    <p>Project Name</p>
                                    <p>Developer Assigned</p>
                                    <p>Priority</p>
                                    <p>Status</p>
                                    <p>Type</p>
                                    <p>Created</p>
                                    <p>Actions</p>
                                </header>
                                <div className="tableList-details-container">
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
                                    </div>
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
                                    </div>
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
                                    </div>
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
                                    </div>
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
                                    </div>
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
                                    </div>
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
                                    </div>
                                    <div className="tableList-row">
                                        <p>Aesthetics please</p>
                                        <p>Demo Project 1</p>
                                        <p>John Sullivan</p>
                                        <p>Medium</p>
                                        <p>Open</p>
                                        <p>Feature Requests</p>
                                        <p>11/09/2016 5:51:38 PM</p>
                                        <div className="ticket-action-buttons">
                                            <a href="/editticket">Edit/Assign</a>
                                            <a href="/ticketdetails">Details</a>
                                        </div>
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
				</div>
			</main>
		</div>
	)
}

export default Tickets; 