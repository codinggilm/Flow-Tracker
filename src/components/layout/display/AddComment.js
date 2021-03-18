import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../../redux/actions';
import Button from '../button/Button';
import '../../../scss/components/layouts/AddComment.scss';
 

class AddComment extends Component {

    state = {
        user:'Jon Smith',
        role: 'Developer',
        content: '',
        ticketId: this.props.ticketId,
        projectId: this.props.projectId,
        project: this.props.project.title
    }

    onChange = (event) => {
        this.setState({ content: event.target.value })
    }

    onSubmittingComment = () => {
        console.log(this.state)
        // this.props.createComment({
        //     user: this.state.user,
        //     role: this.state.role,
        //     content: this.state.content,
        //     ticketId: this.state.usticketIder,
        //     project: this.state.project,
        //     project: this.state.project
        // })
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
        projectId: state.projects.projectId
    }
}

const mapDispatchToProps = { createComment };

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);