import React from 'react';
import UsersList from '../../components/lists/UsersList';
import Button from '../../components/layout/button/Button';
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
                        <label className="selection user-selection">
                            <p className="selection-title">Select 1 or more Users</p>
                            <select multiple>
                                <option>Joshua Mastertson</option>
                                <option>Rebecca Abell</option>
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
                            <div className="btn-role">
                                <Button text="SUBMIT"/>
                            </div>
                        </div>
                    </div>

                    <div className="list-column">
                        <UsersList />
                    </div>
                </div>
			</main>
		</div>
	)
}

export default RoleAssign;