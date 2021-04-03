import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, deleteComment } from '../../../redux/actions';
import List from '../display/List';
import AddAttachment from './AddAttachment';
import '../../../scss/components/layouts/TicketAttachments2.scss';

  
class TicketAttachments2 extends Component {

    renderAttachments = () => {
        return <p>There is no attachment with this ticket</p>
    }

    render() {
        const { ticketComments } = this.props
        return (
            <div> 
                <main className="showcase-main">
                    <div className="list-container">
                        <AddAttachment />

                        <div className="tickets-att-list-main">
                            <List 
                                listTitle="Ticket Attachments"
                                listDescription="All comments for this ticket"
                                titleGrid="tableList-titles attachments"
                                stateObject={ticketComments}
                                allEntries={ticketComments.length} 
                                renderItems={(entriesStart, maxPerPage, searchfield) => 
                                    this.renderAttachments(entriesStart, maxPerPage, searchfield)
                                } 
                            >
                                <p>File</p>
								<p>Uploader</p>
								<p>Notes</p>
								<p>Created</p>
                            </List>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
	return {
		ticketId: state.tickets.ticketId,
		ticketComments: state.comments.ticketComments
	}
}

const mapDispatchToProps = { deleteComment, fetchComments }

export default connect(mapStateToProps, mapDispatchToProps)(TicketAttachments2); 