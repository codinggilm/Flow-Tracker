import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../redux/actions';
import '../../scss/components/lists/TicketCommentsList.scss';

 
class TicketCommentsList extends Component {


	renderComments = () => {
		const comments = this.props.ticketComments;
		return comments.map(comment => {
			return (
				<div className="tableList-row" key={comment.id}>
					<p>{comment.user}</p>
					<p>{comment.content}</p>
					<p>{comment.createdAt}</p>
					{/* <div className="small-del-btn">
						<Button text="DEL"/>
					</div> */}
					<button 
						className="small-del-btn"
						onClick={()=>this.onDeleteComment(comment.id, comment.ticketId)}
						// onClick={()=>this.props.deleteComment(comment.id)}
					>DEL</button>
				</div>
			)
		})
	}

	onDeleteComment = (id, ticketId) => {
		console.log(id)
		this.props.deleteComment({
			id, ticketId
		})
	}


	render() {
		return (
			<div>
				{
					!this.props.ticketComments ? <div>LOADING COMMENTS...</div>
					
					:
				
					<main className="tickets-comments-list-main">
						<div className="list-container">
							<header className="banner-container">
								<div className="list-banner">
									<p className="list-title">Ticket Comments</p>
									<p className="list-detail">All comments for this ticket</p>
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
										<p>Commenter</p>
										<p>Message</p>
										<p>Created</p>
										<p>Delete</p>
									</header>
									<div className="tableList-details-container">
										{this.renderComments()}
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
				}
			</div>
		)
	} 
}

const mapStateToProps = state => {
	return {
		ticketComments: state.comments.ticketComments,
	}
}

const mapDispatchToProps = { deleteComment }

export default connect(mapStateToProps, mapDispatchToProps)(TicketCommentsList); 