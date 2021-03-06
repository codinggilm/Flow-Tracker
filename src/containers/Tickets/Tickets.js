import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTickets, fetchTicket, fetchProjects, fetchUserProjects, fetchUsers, fetchAllProjectUsers, 
    saveTicketId, saveProjectId, fetchComments, fetchTicketHistory
} from '../../redux/actions';
import List from '../../components/layout/display/List'
import Button from '../../components/layout/button/Button';
import '../../scss/containers/Tickets.scss';
 
   
class Tickets extends Component {

    componentDidMount = () => {
        const { currentUser } = this.props;

        this.props.fetchTickets(currentUser.companyId);
        this.props.fetchUsers(currentUser.companyId);
        this.props.fetchAllProjectUsers(currentUser.companyId);

        if (currentUser.role !== 'Admin') {
			this.props.fetchUserProjects(currentUser.id)
		} 
        
    }
    

    saveTicketDetails = (ticketId, projectId) => {
        this.props.saveTicketId(ticketId);
        this.props.saveProjectId(projectId);
    }

    renderTickets(entriesStart, maxPerPage, searchfield) {
        let { tickets, currentUser, userProjects } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;
        let userTickets = [];

        if (currentUser.role === 'Admin') {
            userTickets = tickets;
        }

        if (currentUser.role === 'Project Manager') {
            for (let i=0;  i < tickets.length; i++) {
                for (let v=0; v < userProjects.length; v++) {
                    if (tickets[i].projectId === userProjects[v].projectID) {
                        userTickets.push(tickets[i]);
                    }
                }
            };
        }

        if (currentUser.role === 'Developer') {
            for (let i=0;  i < tickets.length; i++) {
                if (tickets[i].developerId === currentUser.id) {
                    userTickets.push(tickets[i]);
                }
            };
        }

		let filteredList = userTickets.filter(tickets => {
			return (
                tickets.title.toLowerCase().includes(filter) || tickets.project.toLowerCase().includes(filter) ||
                tickets.developer.toLowerCase().includes(filter) || tickets.priority.toLowerCase().includes(filter) ||
                tickets.status.toLowerCase().includes(filter) || tickets.type.toLowerCase().includes(filter)

            )
		})
        
        return filteredList.slice(entriesStart, entriesEnd).map(ticket => {
            return (
                <div className="tableList-row tickets" key={ticket.id}>
                    <p>{ticket.title}</p>
                    <p>{ticket.project}</p>
                    <p>{ticket.developer}</p>
                    <p>{ticket.priority}</p>
                    <p>{ticket.status}</p>
                    <p>{ticket.type}</p>
                    <p>{ticket.createdAt}</p>
                    <div className="ticket-action-buttons">
                        <Link 
                            to="/editticket"
                            className="main-links"
                            onClick={ () => { 
                                this.saveTicketDetails(ticket.id, ticket.projectId);
                                this.props.fetchTicket(ticket.id);
                            }}
                        >Edit/Assign</Link>
                        <Link 
                            to="/ticketdetails"
                            className="main-links" 
                            onClick={ () => {
                                this.saveTicketDetails(ticket.id, ticket.projectId);
                                this.props.fetchComments(ticket.id);
                                this.props.fetchTicketHistory(ticket.id);
                            }}
                        >Details</Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        let { tickets } = this.props;
		// let { entriesStart, maxPerPage } = this.state;

        return (
            <div>
                <main className="tickets-container">
                    <header className="ticket-create">
                        <Link to="/createticket"><Button text="CREATE NEW TICKET"/></Link>
                    </header>

                    <div className="tickets-main">
                        <List 
                            listTitle="Your Tickets"
                            listDescription="All the tickets you have in the database"
                            titleGrid="tableList-titles tickets"
                            stateObject={tickets}
                            allEntries={tickets.length} 
                            renderItems={(entriesStart, maxPerPage, searchfield) => 
                                this.renderTickets(entriesStart, maxPerPage, searchfield)
                            } 
                        >
                            <p>Title</p>
                            <p>Project Name</p>
                            <p>Developer Assigned</p>
                            <p>Priority</p>
                            <p>Status</p>
                            <p>Type</p>
                            <p>Created</p>
                            <p>Actions</p>
                        </List>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        tickets: state.tickets.tickets,
        currentUser: state.auth.currentUser,
        userProjects: state.projects.userProjects  
    }
}

const mapDispatchToProps = { 
    fetchTickets, fetchUsers, fetchProjects, fetchUserProjects, fetchTicket, saveTicketId, 
    saveProjectId, fetchComments, fetchTicketHistory, fetchAllProjectUsers 
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets); 