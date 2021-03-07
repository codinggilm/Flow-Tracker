import React from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/CreateTicket.scss';

   
const CreateTicket = () => {
	return (
		<div> 
			<main className="create-ticket-container">
                <div className="edit-ticket-main">
                    <div className="list-container">
                        <header className="banner-container">
                            <div className="list-banner">
                                <p className="list-title">Create Ticket</p>
                                <p>Create Ticket properties</p>
                            </div>
                        </header>
                        <div className="details-container">
                            <div className="details-row">
                                <div className="details-row-leftside">
                                    <p className="row-title">Title</p>
                                    <input type="text" className="row-input"/>
                                </div>
                                <div className="details-row-rightside">
                                    <p className="row-title">Description</p>
                                    <input type="text" className="row-input"/>
                                </div>
                            </div>
                            <div className="comment-row">
                                {/* <p className="row-title title-comment">Add a comment</p> */}
                                <p className="row-title">Add a comment</p>
                                <input type="text" className="row-input"/>
                            </div>
                            <div className="details-row">
                                <div className="details-row-leftside">
                                    <p className="row-title">Choose Project</p>
                                    <div className="selection">
                                        <select>
                                            <option>Project 1</option>
                                            <option>Project 2</option>
                                            <option>Project 2</option>
                                            <option>Project 2</option>
                                            <option>Project 2</option>
                                            <option>Project 2</option>
                                            <option>Project 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="details-row-rightside">
                                    <p className="row-title">Assign a Developer</p>
                                    <div className="selection">
                                        <select>
                                            <option>Joshua Mastertson</option>
                                            <option>Rebecca Abell</option>
                                            <option>Bobby Davis</option>
                                            <option>Jorgen Malakith</option>
                                            <option>Alexandre Plard</option>
                                            <option>Guillaume Croizon</option>
                                            <option>Brian Thomas</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-row-leftside">
                                    <p className="row-title">Ticket Priority</p>
                                    <div className="selection">
                                        <select>
                                            <option>None</option>
                                            <option>Low</option>
                                            <option>Medium</option>
                                            <option>High</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="details-row-rightside">
                                    <p className="row-title">Ticket type</p>
                                    <div className="selection">
                                        <select>
                                            <option>Bugs/Errors</option>
                                            <option>Feature Requests</option>
                                            <option>Other Comments</option>
                                            <option>Training/Documents Requests</option>
                                            
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-links">
                                <a href="/tickets">Back to List</a>
                                <div className="btn-container">
                                    <Button text="CREATE TICKET"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
			</main>
		</div>
	)
}

export default CreateTicket; 