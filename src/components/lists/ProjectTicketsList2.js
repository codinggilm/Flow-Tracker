import React, { Component } from 'react';
import { fetchTickets, saveTicketId, saveTotalProjectTickets } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '../layout/display/List';
import '../../scss/components/lists/ProjectTicketsList2.scss';

 
class ProjectTicketsList2 extends Component {

	componentDidMount() {
		this.props.fetchTickets();
		// console.log(this.props.tickets)
		// console.log(this.props.projectId)
	}

	renderProjectTickets = (entriesStart, maxPerPage, searchfield) => {
        let { tickets } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;

        let projectTickets = tickets.filter(ticket => ticket.projectId === this.props.projectId);

        this.props.saveTotalProjectTickets(projectTickets.length);

		let filteredList = projectTickets.filter(projectTickets => {
			return (
                projectTickets.title.toLowerCase().includes(filter) || projectTickets.submitter.toLowerCase().includes(filter) ||
                projectTickets.developer.toLowerCase().includes(filter) || projectTickets.status.toLowerCase().includes(filter) ||
                projectTickets.createdAt.toLowerCase().includes(filter)

            )
		})

        return filteredList.slice(entriesStart, entriesEnd).map(ticket => {
            return (
                <div className="tableList-row project-tickets" key={ticket.id}>
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
		})
	}


	render() {
        let { tickets, totalProjectTickets } = this.props;

		return (
			<div>
				<main className="project-tickets-list-main">
                    <List 
                        listTitle="Tickets for this Project"
                        listDescription="Condensed Ticket Details"
                        titleGrid="tableList-titles project-tickets"
                        stateObject={tickets}
                        allEntries={totalProjectTickets} 
                        renderItems={(entriesStart, maxPerPage, searchfield) => this.renderProjectTickets(entriesStart, 
                        maxPerPage, searchfield)} 
                    >
                        <p>Title</p>
                        <p>Submitter</p>
                        <p>Developer</p>
                        <p>Status</p>
                        <p>Created</p>
                    </List>
				</main>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        projectId: state.projects.projectId,
		tickets: state.tickets.tickets,
        totalProjectTickets: state.pagination.totalProjectTickets
    }
}

const mapDispatchToProps = { fetchTickets, saveTicketId, saveTotalProjectTickets }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTicketsList2); 