import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchProject} from '../../redux/actions';
import Showcase from '../../components/layout/display/Showcase';
import ProjectUsersList from '../../components/lists/ProjectUsersList';
import ProjectTicketsList from '../../components/lists/ProjectTicketsList';
import '../../scss/containers/ProjectDetails.scss';
 
 
class ProjectDetails extends Component {

    componentDidMount = () => {
        this.props.fetchUsers();
        this.props.fetchProject();
    }

    render() {
        return (
            <div>  
                <main className="project-details-container">
                    <header className="showcase">
                        <Showcase />
                    </header>
                    <div className="project-details-grid">
                        <div className="list-card">
                        {
                            this.props.project ? <ProjectUsersList /> : <h2>FETCHING DETAILS...</h2>

                        }
                            {/* <ProjectUsersList /> */}
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


const mapStateToProps = state => {
    return {
        project: state.projects.project[0]
    }
}

const mapDispatchToProps = { fetchUsers, fetchProject }


export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);