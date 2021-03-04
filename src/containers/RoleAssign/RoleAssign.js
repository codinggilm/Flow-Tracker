import React from 'react';
import PersonnelList from '../../components/lists/PersonnelList';
import '../../scss/containers/RoleAssign.scss';


const RoleAssign = () => {
	return (
		<div>
			<main className="roles-main">
                <div className="roles-title">
                    <p>Manage User Roles</p>
                </div>
                <div className="roles-manage-container">
                    <div className="roles-column">
                        <label className="selection">
                            <p className="selection-title">Select 1 or more Users</p>
                            <select multiple>
                                <option>Joshua Mastertson</option>
                                <option>Deviant Man</option>
                                <option>Bobby Davis</option>
                                <option>Jorgen Malakith</option>
                                <option>Alexandre Plard</option>
                                <option>Guillaume Croizon</option>
                                <option>Brian Thomas</option>
                            </select>
                        </label>

                        <div className="selection role-selection">
                            <label>
                                <p className="selection-title">Select the Role to assign</p>
                                <select>
                                    <option>--Select Role/None--</option>
                                    <option>Admin</option>
                                    <option>Project Manager</option>
                                    <option>Developer</option>
                                    <option>Submitter</option>
                                </select>
                            </label>
                            <button>SUBMIT</button>
                        </div>
                    </div>

                    <div className="list-column">
                        <PersonnelList />
                    </div>
                </div>
			</main>
		</div>
	)
}

export default RoleAssign;




/* <p>Select 1 or more Users</p> */
/* <Form.Group controlId="exampleForm.ControlSelect2">
<Form.Label>Select 1 or more Users</Form.Label>
<Form.Control as="select" multiple>
    <option>Joshua Mastertson</option>
    <option>Deviant Man</option>
    <option>Bobby Davis</option>
    <option>Jorgen Malakith</option>
    <option>Alexandre Plard</option>
    <option>Guillaume Croizon</option>
    <option>Brian Thomas</option>
</Form.Control>
</Form.Group> */
