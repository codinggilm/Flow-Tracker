import React, { Component } from 'react';
import { fetchTickets, saveTicketId } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../scss/components/lists/ProjectTicketsList.scss';

 
class ProjectTicketsList extends Component {

	componentDidMount() {
		this.props.fetchTickets();
		// console.log(this.props.tickets)
		// console.log(this.props.projectId)
	}

	renderTickets = () => {
		// console.log(this.props.tickets)
		return this.props.tickets.map(ticket => {
			if (ticket.projectId === this.props.projectId) {
				return (
					<div className="tableList-row" key={ticket.id}>
						<p>{ticket.title}</p>
						<p>{ticket.submitter}</p>
						<p>{ticket.developer}</p>
						<p>{ticket.status}</p>
						<p>{ticket.createdAt}</p>
						<p><Link to="/ticketdetails" onClick={() => this.props.saveTicketId(ticket.id)}>
							More Details
							</Link>
						</p>
					</div>
				)
			} else {
				return null;
			}
		})
	}


	render() {
		return (
			<div>
				<main className="project-tickets-list-main">
					<div className="list-container">
						<header className="banner-container">
							<div className="list-banner">
								<p className="list-title">Tickets for this Project</p>
								<p className="list-detail">Condensed Ticket Details</p>
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
									<p>Submitter</p>
									<p>Developer</p>
									<p>Status</p>
									<p>Created</p>
								</header>
								<div className="tableList-details-container">
								{this.renderTickets()}
									{/* <div className="tableList-row">
										<p>Great Work!</p>
										<p>John Davis</p>
										<p>DemoD Dev</p>
										<p>Open</p>
										<p>01/01/2021 9:50 AM</p>
										<p><a href="/tickedetails">More Details</a></p>
									</div>
									<div className="tableList-row">
										<p>Found a weird bug</p>
										<p>Sam Tully</p> 
										<p>Robert Plant</p>
										<p>Closed</p>
										<p>03/04/2021 6:30 PM</p>
										<p><a href="/tickedetails">More Details</a></p>
									</div> */}
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
}

const mapStateToProps = state => {
    return {
        projectId: state.projects.projectId,
		tickets: state.tickets.tickets
    }
}

const mapDispatchToProps = { fetchTickets, saveTicketId }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTicketsList); 