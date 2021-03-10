import React, { Component } from 'react';
import Showcase from '../../components/layout/display/Showcase';
import ProjectUsersList from '../../components/lists/ProjectUsersList';
import ProjectTicketsList from '../../components/lists/ProjectTicketsList';
import '../../scss/containers/ProjectDetails.scss';

 
class ProjectDetails extends Component {

    // componentDidMount = () => {
    //     this.props.fetchProject()
    // }


    render() {
        return (
            <div>  
                <main className="project-details-container">
                    <header className="showcase">
                        <Showcase />
                    </header>
                    <div className="project-details-grid">
                        <div className="list-card">
                            <ProjectUsersList />
                        </div>
                        <div className="list-card">
                            <ProjectTicketsList />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default ProjectDetails;