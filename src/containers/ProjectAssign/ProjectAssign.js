import React from 'react';
// import TopNav from '../../components/navigation/TopNav/TopNav';
// import SideNav from '../../components/navigation/SideNav/SideNav';
import ProjectsList from '../../components/lists/ProjectsList';
import Button from '../../components/layout/button/Button';
import '../../scss/containers/ProjectAssign.scss';
 
 
const ProjectAssign = () => {
	return (
		<div>
			<main className="projects-main">
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
                                <p className="selection-title">Select the Project to assign</p>
                                <select>
                                    <option>--Select Role/None--</option>
                                    <option>Project Name</option>
                                    <option>Project Name</option>
                                    <option>Project Name</option>
                                    <option>Project Name</option>
                                </select>
                            </label>
                            <div className="btn-role">
                                <Button text="SUBMIT"/>
                            </div>
                        </div>
                    </div>

                    <div className="list-column">
                        <ProjectsList />
                    </div>
                </div>
			</main>
		</div>
	)
}

export default ProjectAssign;