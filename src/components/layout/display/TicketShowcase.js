import React from 'react';
// import TableList from './TableList';
import '../../../scss/components/layouts/TicketShowcase.scss';

  
const TicketShowcase = () => {
	return (
		<div> 
			<main className="ticket-showcase-main">
				<div className="list-container">
					<header className="banner-container">
						<div className="list-banner">
							<p className="list-title">Details for Ticket #12</p>
							<div className="project-nav-links">
                                <a href="/tickets">Back to List</a>
                                <p>|</p>
                                <a href="/editticket">Edit Ticket</a>
                            </div>
						</div>
					</header>
                    <div className="details-container">
                        <div className="details-row">
                            <div className="details-row-leftside">
                                <p className="row-title">TICKET TITLE</p>
                                <p className="row-text">Great Work</p>
                            </div>
                            <div className="details-row-rightside">
                                <p className="row-title">TICKET DESCRIPTION</p>
                                <p className="row-text">Keep on plugging in the code, you're getting there</p>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-row-leftside">
                                <p className="row-title">ASSIGNED DEVELOPER</p>
                                <p className="row-text">Demo Dev</p>
                            </div>
                            <div className="details-row-rightside">
                                <p className="row-title">SUBMITTER</p>
                                <p className="row-text">Matt Hamilton</p>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-row-leftside">
                                <p className="row-title">PROJECT</p>
                                <p className="row-text">Unit Test 4</p>
                            </div>
                            <div className="details-row-rightside">
                                <p className="row-title">TICKET PRIORITY</p>
                                <p className="row-text">Medium</p>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-row-leftside">
                                <p className="row-title">TICKET STATUS</p>
                                <p className="row-text">Open</p>
                            </div>
                            <div className="details-row-rightside">
                                <p className="row-title">TICKET TYPE</p>
                                <p className="row-text">Bugs/Errors</p>
                            </div>
                        </div>
                        <div className="details-row">
                            <div className="details-row-leftside">
                                <p className="row-title">CREATED</p>
                                <p className="row-text">11/18/2019 9:54:45 AM</p>
                            </div>
                            <div className="details-row-rightside">
                                <p className="row-title">UPDATED</p>
                                <p className="row-text"></p>
                            </div>
                        </div>
                    </div>
				</div>
			</main>
		</div>
	)
}

export default TicketShowcase; 