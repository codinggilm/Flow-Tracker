import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { fetchTickets, fetchUserProjects } from '../../../redux/actions';
import '../../../scss/components/layouts/BarChart.scss';

class TypeChart extends React.Component {

	componentDidMount () {
        const { currentUser } = this.props;

		if (currentUser.role !== 'Admin') {
			this.props.fetchUserProjects(currentUser.id)
		} 

		this.props.fetchTickets(currentUser.companyId);
    }

	calculateChartData = () => {
		const { tickets, currentUser, userProjects } = this.props;
        let userTickets = [];

		if (currentUser.role === 'Admin') {
            userTickets = tickets;
        }

        if (currentUser.role === 'Project Manager') {
            for (let i=0;  i < tickets.length; i++) {
                for (let v=0; v < userProjects.length; v++) {
                    if (tickets[i].projectId === userProjects[v].projectID) {
                        userTickets.push(tickets[i]);
                    }
                }
            };
        }

        if (currentUser.role === 'Developer') {
            for (let i=0;  i < tickets.length; i++) {
                if (tickets[i].developerId === currentUser.id) {
                    userTickets.push(tickets[i]);
                }
            };
        }

		let bugs = userTickets.filter(ticket => ticket.type === 'Bugs/Errors');
		let featureRequests = userTickets.filter(ticket => ticket.type === 'Feature Requests');
		let otherComments = userTickets.filter(ticket => ticket.type === 'Other Comments');
		let trainingRequests = userTickets.filter(ticket => ticket.type === 'Training/Documents Requests ');

		const result = [bugs.length, featureRequests.length, otherComments.length, trainingRequests.length];

		let data = {
			labels: ["Bugs", "Feature Requests", "Other Comments", "Training Requests"],
			datasets: [
				{
					data: result,
					backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
					hoverBackgroundColor: [
					"#FF5A5E",
					"#5AD3D1",
					"#FFC870",
					"#A8B3C5",
					"#616774"
					]
				}
			]
		}

		return data;
	}

	render() {
		return (
		<MDBContainer className="chart-container">
			<Doughnut data={this.calculateChartData()} options={{ responsive: true }} />
		</MDBContainer>
		);
	}
}


const mapStateToProps = state => {
    return {
        tickets: state.tickets.tickets,
        currentUser: state.auth.currentUser,
        userProjects: state.projects.userProjects  
    }
}

const mapDispatchToProps = { fetchTickets, fetchUserProjects }

export default connect(mapStateToProps, mapDispatchToProps)(TypeChart); 