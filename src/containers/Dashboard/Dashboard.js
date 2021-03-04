import React from 'react';
// import ChartCard from '../../components/layout/ChartCard';
import PriorityChart from '../../components/layout/charts/PriorityChart';
import StatusChart from '../../components/layout/charts/StatusChart';
import TypeChart from '../../components/layout/charts/TypeChart';
import SubmitterChart from '../../components/layout/charts/SubmitterChart';
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
                    <div className="chart-card">
                        <SubmitterChart />
                        <p>Tickets by Submitter</p>
                    </div>


                    {/* <ChartCard /> */}
                </div>
			</main>
		</div>
	)
}

export default Dashboard;
