import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../../redux/actions';
import Button from '../button/Button';
import '../../../scss/components/layouts/AddComment.scss';
 

class AddComment extends Component {

    state = {
        content: ''
    }

    onChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onSubmittingComment = () => {
        const { currentUser, ticketId, projectId, project } = this.props;

        this.props.createComment({ 
            user: currentUser.username,
            userId: currentUser.id,
            role: currentUser.role,
            content: this.state.content,
            ticketId: ticketId,
            projectId: projectId,
            project: project.title
        })
    }

    render() {
        return (
            <div>
                <main className="add-comment-main">
                    <p>Add a Comment?</p>
                    <div className="enter-comment">
                        <input type="text" onChange={this.onChange}/>
                        <div className="button-container">
                            <Button text="ADD" onClick={this.onSubmittingComment}/>
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
        project: state.projects.project[0],
        projectId: state.projects.projectId,
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = { createComment };

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);