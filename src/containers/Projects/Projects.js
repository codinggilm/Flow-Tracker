import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../redux/actions';
import Button from '../../components/layout/button/Button';
import ProjectsList from '../../components/lists/ProjectsList'
import '../../scss/containers/Projects.scss';
 

class Projects extends Component {

    componentDidMount = () => {
        this.props.fetchUsers(this.props.currentUser.companyId);
    }
 
    render() {
        return (
            <div>  
                <main className="projects-container">
                    <header className="project-create">
                        <Link to="/createproject"><Button text="CREATE NEW PROJECT"/></Link>
                    </header>
                    
                    <div className="projects-list-container">
                        <ProjectsList />
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.currentUser
    }
}

const mapDispatchToProps = { fetchUsers }

export default connect(mapStateToProps, mapDispatchToProps)(Projects);