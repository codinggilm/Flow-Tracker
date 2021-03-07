import React from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/EditTicket.scss';
 
   
const EditTicket = () => {
	return (
		<div> 
			<main className="edit-ticket-container">
                <div className="edit-ticket-main">
                    <div className="list-container">
                        <header className="banner-container">
                            <div className="list-banner">
                                <p className="list-title">Edit Ticket</p>
                                <p>Change Ticket properties</p>
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
                            <div className="details-row">
                                <div className="details-row-leftside">
                                    <p className="row-title">Project</p>
                                    <div className="selection">
                                        <select>
                                            <option >Joshua Mastertson</option>
                                            <option>Rebecca Abell</option>
                                            <option>Bobby Davis</option>
                                            <option>Jorgen Malakith</option>
                                            <option>Alexandre Plard</option>
                                            <option>Guillaume Croizon</option>
                                            <option>Brian Thomas</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="details-row-rightside">
                                    <p className="row-title">Assigned Developer</p>
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
                                    <p className="row-title">Ticket Status</p>
                                    <div className="selection">
                                        <select>
                                            <option>In Progress</option>
                                            <option>Open</option>
                                            <option>Close</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-row-leftside">
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
                                <a href="/">Back to List</a>
                                <div className="btn-container">
                                    <Button text="UPDATE TICKET"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
			</main>
		</div>
	)
}

export default EditTicket; 