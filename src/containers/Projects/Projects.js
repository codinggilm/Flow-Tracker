import React from 'react';
import Button from '../../components/layout/button/Button';
import ProjectsList from '../../components/lists/ProjectsList'
import '../../scss/containers/Projects.scss';


const Projects = () => {
	return (
		<div>  
            <main className="projects-container">
                <header className="project-create">
                    <a href="/createproject"><Button text="CREATE NEW PROJECT"/></a>
                </header>
                
                <div className="projects-list-container">
                    <ProjectsList />
                </div>
            </main>
		</div>
	)
}

export default Projects;