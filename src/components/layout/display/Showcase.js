import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProject } from '../../../redux/actions';

import '../../../scss/components/layouts/Showcase.scss';

 
class Showcase extends Component {

    componentDidMount() {
        this.props.fetchProject(this.props.projectId)
        console.log(this.props.project)
    }
    
    render() {
        const project = this.props.project;
        return (
            <div> 
                <main className="showcase-main">
                    <div className="list-container">
                        <header className="banner-container">
                            <div className="list-banner">
                                <p className="list-title">Details for Project #1</p>
                                <div className="project-nav-links">
                                    <Link to="/projects">Back to List</Link>
                                    <p>|</p>
                                    <Link to="/editproject">Edit</Link>
                                </div>
                            </div>
                        </header> 
                        <div className="showcase-titles">
                            <div className="project-name">
                                <p className="title">Project Name</p>
                                <p className="detail">{project.title}</p>
                            </div>
                            <div className="project-description">
                                <p className="title">Project Description</p>
                                <p className="detail">{project.description}</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projectId: state.projects.projectId,
        project: state.projects.project
    }
}

const mapDispatchToProps = { fetchProject }

export default connect(mapStateToProps, mapDispatchToProps)(Showcase); 