import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    fetchTickets, 
    fetchTicket, 
    fetchProjects, 
    fetchUsers, 
    saveTicketId, 
    saveProjectId, 
    fetchComments,
    fetchTicketHistory
} from '../../redux/actions';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/Tickets.scss';
 
  
class Tickets extends Component {

    componentDidMount() {
        this.props.fetchTickets();
        this.props.fetchProjects();
        this.props.fetchUsers();
    } 

    saveTicketDetails = (ticketId, projectId) => {
        this.props.saveTicketId(ticketId);
        this.props.saveProjectId(projectId);
    }

    renderTickets() {
        return this.props.tickets.map(ticket => {
            return (
                <div className="tableList-row" key={ticket.id}>
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
                            onClick={ ()=> {
                                this.saveTicketDetails(ticket.id, ticket.projectId);
                                this.props.fetchTicket(ticket.id);
                                }
                            }
                        >Edit/Assign</Link>
                        <Link 
                            to="/ticketdetails" 
                            onClick={ ()=> {
                                this.saveTicketDetails(ticket.id, ticket.projectId);
                                this.props.fetchComments(ticket.id);
                                this.props.fetchTicketHistory(ticket.id);
                                // console.log(ticket.id)
                                }
                            }
                        >Details
                        </Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <main className="tickets-container">
                    <header className="ticket-create">
                        <Link to="/createticket"><Button text="CREATE NEW TICKET"/></Link>
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
                                        {this.renderTickets()}
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
}

const mapStateToProps = state => {
    return { 
        tickets: state.tickets.tickets 
    }
}

const mapDispatchToProps = { 
    fetchTickets, 
    fetchUsers, 
    fetchProjects, 
    fetchTicket, 
    saveTicketId, 
    saveProjectId,
    fetchComments,
    fetchTicketHistory 
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets); 