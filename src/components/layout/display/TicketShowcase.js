import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { fetchTicket } from '../../../redux/actions';
import '../../../scss/components/layouts/TicketShowcase.scss';

  
class TicketShowcase extends Component {

    componentDidMount() {
        this.props.fetchTicket(this.props.ticketId)
    }
    
    render() {
        const ticket = this.props.ticket;

        return (
            <div> 
                {
                    !ticket ? <div>FETCHING TICKET DETAILS...</div> 

                    :
                    
                    <main className="ticket-showcase-main">
                        <div className="list-container">
                            <header className="banner-container">
                                <div className="list-banner">
                                    <p className="list-title">Details for {ticket.title}</p>
                                    <div className="project-nav-links">
                                        <Link to="/tickets">Back to List</Link>
                                        <p>|</p>
                                        <Link to="/editticket">Edit Ticket</Link>
                                    </div>
                                </div>
                            </header>
                            <div className="details-container">
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">TICKET TITLE</p>
                                        <p className="row-text">{ticket.title}</p>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">TICKET DESCRIPTION</p>
                                        <p className="row-text">{ticket.description}</p>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">ASSIGNED DEVELOPER</p>
                                        <p className="row-text">{ticket.developer}</p>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">SUBMITTER</p>
                                        <p className="row-text">{ticket.submitter}</p>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">PROJECT</p>
                                        <p className="row-text">{ticket.project}</p>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">TICKET PRIORITY</p>
                                        <p className="row-text">{ticket.priority}</p>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">TICKET STATUS</p>
                                        <p className="row-text">{ticket.status}</p>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">TICKET TYPE</p>
                                        <p className="row-text">{ticket.type}</p>
                                    </div>
                                </div>
                                <div className="details-row">
                                    <div className="details-row-leftside">
                                        <p className="row-title">CREATED</p>
                                        <p className="row-text">{ticket.createdAt}</p>
                                    </div>
                                    <div className="details-row-rightside">
                                        <p className="row-title">UPDATED</p>
                                        <p className="row-text"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ticketId: state.tickets.ticketId,
        ticket: state.tickets.ticket[0]
    }
}

const mapDispatchToProps = { fetchTicket };

export default connect(mapStateToProps, mapDispatchToProps)(TicketShowcase); 