import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../layout/display/List';
import '../../scss/components/lists/TicketHistory2.scss';

 
class TicketHistory2 extends Component {


	renderHistory = (entriesStart, maxPerPage, searchfield) => {
        let { history } = this.props;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;

		let filteredList = history.filter(history => {
			return (
                history.property.toLowerCase().includes(filter) || history.oldValue.toLowerCase().includes(filter) ||
                history.newValue.toLowerCase().includes(filter) || history.createdAt.toLowerCase().includes(filter) 

            )
		})

        // return this.props.history.map(entry => {
        return filteredList.slice(entriesStart, entriesEnd).map(entry => {
            return (
                <div className="tableList-row ticket-history" key={entry.id}>
					<p>{entry.property}</p>
					<p>{entry.oldValue}</p>
					<p>{entry.newValue}</p>
					<p>{entry.createdAt}</p>
				</div>
            )
        })
    }

	render() {
        const { history } = this.props
		return (
				<main className="ticket-history-main">
                    <List 
                        listTitle="Ticket History"
                        listDescription="Complete history of this ticket"
                        titleGrid="tableList-titles ticket-history"
                        stateObject={history}
                        allEntries={history.length}  
                        renderItems={(entriesStart, maxPerPage, searchfield) => this.renderHistory(entriesStart, 
                        maxPerPage, searchfield)} 
                    >
                        <p>Property</p>
                        <p>Old Value</p>
                        <p>New Value</p>
                        <p>Date Changed</p>
                    </List>
				</main>
		)
	}
}

const mapStateToProps = state => {
    return { 
        history: state.tickets.ticketHistory
    }
}

// const mapDispatchToProps = { fetchUsers }


export default connect(mapStateToProps)(TicketHistory2); 