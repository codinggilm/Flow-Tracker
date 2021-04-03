import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, deleteComment } from '../../../redux/actions';
import List from '../display/List';
import AddComment from './AddComment';
import '../../../scss/components/layouts/TicketComments.scss';

   
class TicketComments2 extends Component {
    
    componentDidMount = () => {
		this.props.fetchComments(this.props.ticketId)
	}

	renderComments = (entriesStart, maxPerPage, searchfield) => {
        const comments = this.props.ticketComments;
		let entriesEnd = entriesStart + maxPerPage;
		let filter = searchfield;

		let filteredList = comments.filter(comments => {
			return (
                comments.user.toLowerCase().includes(filter) || comments.content.toLowerCase().includes(filter) ||
                comments.createdAt.toLowerCase().includes(filter) 
            )
		})
		
        return filteredList.slice(entriesStart, entriesEnd).map(comment => {
			return (
				<div className="tableList-row comments" key={comment.id}>
					<p>{comment.user}</p>
					<p>{comment.content}</p>
					<p>{comment.createdAt}</p>
					{/* <div className="small-del-btn">
						<Button text="DEL"/>
					</div> */}
					<button 
						className="small-del-btn"
						onClick={()=>this.onDeleteComment(comment.id)}
						// onClick={()=>this.props.deleteComment(comment.id)}
					>DEL</button>
				</div>
			)
		})
	}

    onDeleteComment = (id) => {
		// console.log(id, this.props.ticketId)
		this.props.deleteComment(id, this.props.ticketId)
	}

    render() {
        const { ticketComments } = this.props;

        return (
            <div> 
                <main className="showcase-main">
                    <div className="list-container">
                        <AddComment />
                        <div className="tickets-comments-list-main">
                            <List 
                                listTitle="Ticket Comments"
                                listDescription="All comments for this ticket"
                                titleGrid="tableList-titles comments"
                                stateObject={ticketComments}
                                allEntries={ticketComments.length} 
                                renderItems={(entriesStart, maxPerPage, searchfield) => 
                                    this.renderComments(entriesStart, maxPerPage, searchfield)
                                } 
                            >
                                <p>Commenter</p>
                                <p>Message</p>
                                <p>Created</p>
                                <p>Delete</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(TicketComments2); 