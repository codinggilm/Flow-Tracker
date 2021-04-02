import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTickets, fetchTicket, fetchProjects, fetchUsers, 
    saveTicketId, saveProjectId, fetchComments, fetchTicketHistory
} from '../../redux/actions';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/Tickets.scss';
 
  
class Tickets extends Component {

    state = {
		currentPage: 1,
		entriesStart: 0,
		maxPerPage: 10,
		currentEnd: this.props.tickets.length,
		searchfield: ''
	}

    componentDidMount = () => {
        this.props.fetchTickets();
        this.props.fetchProjects();
        this.props.fetchUsers();
    }
    
    setEntries = (event) => {
		if (event.target.value > 0) {
			this.setState({ maxPerPage: parseInt(event.target.value) })
		}
	}

    setFilter = (event) => {
		this.setState({ searchfield: event.target.value })
        // console.log(this.state.searchfield)
	}

    renderPagination = () => {
		let { maxPerPage } = this.state;
		let pages = this.props.tickets.length / maxPerPage;
		let pagesArray = [];

		for (let i=0; i < pages; i++) {
			pagesArray.push(i)
		}

		let pageButtons = pagesArray.map(el => {
			let style;
			if ((el + 1)  === this.state.currentPage) { style = 'page-number page-selected' }
			else { style = 'page-number' }

			return <p className={style} key={el} onClick={() => this.changePage(el)}>{el + 1}</p>
		})

		return pageButtons;
	}

    changePage = (el) => {
		let { maxPerPage } = this.state;
		this.setState({
			entriesStart: el * maxPerPage,
			currentPage: el + 1 
		})
	}

    nextPage = () => {
		let currentStart = this.state.entriesStart;
		let { maxPerPage } = this.state;

		if (currentStart + maxPerPage <= this.props.tickets.length - 1) {
			this.setState({ 
				entriesStart: currentStart + maxPerPage,
				currentPage: this.state.currentPage + 1 
			})
		} else {
			alert('no more entries')
		}
	}

	previousPage = () => {
		let currentStart = this.state.entriesStart;
		let { maxPerPage } = this.state;

		if (currentStart === 0) return alert('you are at the start')

		if ((currentStart - maxPerPage) < 0) {
			this.setState({ entriesStart: 0 })

		} else if (currentStart !== 0) {
			this.setState({ 
				entriesStart: currentStart - maxPerPage,
				currentPage: this.state.currentPage - 1  
			})
		} 

	}

    calcCurrentEnd = () => {
		let { tickets } = this.props;
		let { entriesStart, maxPerPage } = this.state;
		let end;

		if (entriesStart + maxPerPage <= tickets.length) {
			end = entriesStart + maxPerPage;
		} else {
			end = tickets.length;
		}
		return end;
	}

    saveTicketDetails = (ticketId, projectId) => {
        this.props.saveTicketId(ticketId);
        this.props.saveProjectId(projectId);
    }

    renderTickets() {
        let { tickets } = this.props;
		let { maxPerPage, entriesStart } = this.state;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = this.state.searchfield;

		let filteredList = tickets.filter(tickets => {
			return (
                tickets.title.toLowerCase().includes(filter) || tickets.project.toLowerCase().includes(filter) ||
                tickets.developer.toLowerCase().includes(filter) || tickets.priority.toLowerCase().includes(filter) ||
                tickets.status.toLowerCase().includes(filter) || tickets.type.toLowerCase().includes(filter)

            )
		})
        return filteredList.slice(entriesStart, entriesEnd).map(ticket => {
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
                            onClick={ () => {
                                this.saveTicketDetails(ticket.id, ticket.projectId);
                                this.props.fetchTicket(ticket.id);
                            }}
                        >Edit/Assign</Link>
                        <Link 
                            to="/ticketdetails" 
                            onClick={ ()=> {
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
		let { entriesStart, maxPerPage } = this.state;

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
                                        <input 
                                            type="number" 
                                            className="small-input"
                                            defaultValue={maxPerPage}
										    onChange={this.setEntries} 
                                        />
                                        <p>entries</p>
                                    </div>
                                    <div className="entries-search">
                                        <p>Search:</p>
                                        <input type="search" onChange={this.setFilter}/>
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
                                        <p>Showing {entriesStart + 1} to {this.calcCurrentEnd()} of {tickets.length} entries</p>
                                        <div className="tableList-pagination">
                                            <p onClick={this.previousPage}>Previous</p>
                                            {this.renderPagination()}
                                            <p onClick={this.nextPage}>Next</p>
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
    fetchTickets, fetchUsers, fetchProjects, fetchTicket, saveTicketId, 
    saveProjectId, fetchComments, fetchTicketHistory 
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickets); 