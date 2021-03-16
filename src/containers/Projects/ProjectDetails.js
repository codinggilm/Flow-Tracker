import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actions';
import Showcase from '../../components/layout/display/Showcase';
import ProjectUsersList from '../../components/lists/ProjectUsersList';
import ProjectTicketsList from '../../components/lists/ProjectTicketsList';
import '../../scss/containers/ProjectDetails.scss';
 
 
class ProjectDetails extends Component {

    componentDidMount = () => {
        this.props.fetchUsers();
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


const mapDispatchToProps = { fetchUsers }

export default connect(null, mapDispatchToProps)(ProjectDetails);