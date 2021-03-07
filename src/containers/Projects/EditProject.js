import React from 'react';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/EditProject.scss';

 
const EditProject = () => {
	return (
		<div> 
			<main className="edit-project-container">
                <div className="edit-ticket-main">
                    <div className="list-container">
                        <header className="banner-container">
                            <div className="list-banner">
                                <p className="list-title">Edit Project</p>
                                <p>Change Project properties</p>
                            </div>
                        </header>
                        <div className="details-container">
                            <div className="details-row">
                                <div className="details-row-leftside">
                                    <p className="row-title">Project Name</p>
                                    <input type="text" className="row-input"/>
                                </div>
                                <div className="details-row-rightside">
                                    <p className="row-title">Description</p>
                                    <input type="text" className="row-input"/>
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-row-leftside">
                                    <p className="row-title">Assigned Personnel</p>
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
                                    <p className="row-title">Actions</p>
                                    <div className="btn-actions">
                                        {/* <button className="btn-add-user">ADD</button> */}
                                        <button className="btn-del-user">REMOVE USER</button>
                                    </div>
                                </div>
                            </div>
                            <div className="details-row">
                                <div className="details-row-leftside">
                                    <p className="row-title">Tickets</p>
                                    <div className="selection">
                                        <select>
                                            <option>Ticket 1</option>
                                            <option>Ticket 2</option>
                                            <option>Ticket 3</option>
                                            <option>Ticket 4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="details-row-rightside">
                                    <p className="row-title">Actions</p>
                                    <div className="btn-actions">
                                        {/* <button className="btn-add-user">ADD</button> */}
                                        <button className="btn-del-user">REMOVE TICKET</button>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-links">
                                <a href="/projects">Back to List</a>
                                <div className="btn-container">
                                    <Button text="UPDATE PROJECT"/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
			</main>
		</div>
	)
}

export default EditProject; 