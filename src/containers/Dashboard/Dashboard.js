import React from 'react';
// import TopNav from '../../components/navigation/TopNav/TopNav';
// import SideNav from '../../components/navigation/SideNav/SideNav';
// import ChartCard from '../../components/layout/ChartCard';
import PriorityChart from '../../components/layout/charts/PriorityChart';
import StatusChart from '../../components/layout/charts/StatusChart';
import TypeChart from '../../components/layout/charts/TypeChart';
import SubmitterChart from '../../components/layout/charts/SubmitterChart';
import ProjectsChart from '../../components/layout/charts/ProjectsChart';
import '../../scss/containers/Dashboard.scss';

 
const Dashboard = () => {
	return (
		<div>
			<main className="dashboard-main">
                <div className="dashboard-grid">

                    <div className="chart-card">
                        <PriorityChart />
                        <p>Tickets by Priority</p>
                    </div>
                    <div className="chart-card">
                        <TypeChart />
                        <p>Tickets by Type</p>
                    </div>
                    <div className="chart-card">
                        <StatusChart />
                        <p>Tickets by Status</p>
                    </div>
                    <div>
                        <div className="chart-card">
                            <ProjectsChart />
                            <p className="project-chart">Tickets by Project</p>
                        </div>
                    </div> 

                </div>
			</main>
		</div>
	)
}

export default Dashboard;



// Testing Css issue 
/* <div className="chart-card">
    <PriorityChart />
    <p>Tickets by Priority</p>
</div>
<div className="chart-card">
    <TypeChart />
    <p>Tickets by Type</p>
</div>
<div className="chart-card">
    <StatusChart />
    <p>Tickets by Status</p>
</div>
<div>
    <div className="chart-card">
        <ProjectsChart />
        <p>Tickets by Project</p>
    </div>
</div> */

/* <div>
                        <div className="chart-card">
                            <PriorityChart />
                            <p>Tickets by Priority</p>
                        </div>
                    </div>
                    <div>
                        <div className="chart-card">
                            <TypeChart />
                            <p>Tickets by Type</p>
                        </div>
                    </div>
                    <div>
                        <div className="chart-card">
                            <StatusChart />
                            <p>Tickets by Status</p>
                        </div>
                    </div>
                    <div>
                        <div className="chart-card">
                            <ProjectsChart />
                            <p>Tickets by Project</p>
                        </div>
                    </div> */