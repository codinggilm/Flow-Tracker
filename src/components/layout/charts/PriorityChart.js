import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { fetchTickets, fetchUserProjects } from '../../../redux/actions';
import '../../../scss/components/layouts/BarChart.scss';

class PriorityChart extends React.Component {

  	state = {
		barChartOptions: {
			responsive: true,
			maintainAspectRatio: true,
			dataset: {
				xAxes: [
					{
						barPercentage: 1,
						gridLines: {
						display: true,
						color: "rgba(0, 0, 0, 0.1)"
						}
					}
					],
					yAxes: [
					{
						gridLines: {
						display: true,
						color: "rgba(0, 0, 0, 0.1)"
						},
						ticks: {
						beginAtZero: true
						}
					}
				]
			}
		}
  	}


	componentDidMount = () => {
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

		let none = userTickets.filter(ticket => ticket.priority === 'None');
		let low = userTickets.filter(ticket => ticket.priority === 'Low');
		let medium = userTickets.filter(ticket => ticket.priority === 'Medium');
		let high = userTickets.filter(ticket => ticket.priority === 'High');

		const result = [none.length, low.length, medium.length, high.length];

		let data = {
			labels: ["None", "Low", "Medium", "High"],
			datasets: [
				{
					label: "number of tickets",
					data: result,
					backgroundColor: [
						"rgba(98,  182, 239,0.4)",	// Blue
						"rgba(113, 205, 205,0.4)", //Green
						"rgba(255, 218, 128,0.4)", // Yellow
						"rgba(255, 134,159,0.4)", // red
					],
					borderWidth: 2,
					borderColor: [
						"rgba(98,  182, 239, 1)",// Blue
						"rgba(113, 205, 205, 1)",//Green
						"rgba(255, 218, 128, 1)",// Yellow
						"rgba(255, 134, 159, 1)",// red
					]
				}
			]
		}

		return data;
	}


  	render() {

		return (
		<MDBContainer className="chart-container">
			<Bar data={this.calculateChartData()} options={this.state.barChartOptions} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PriorityChart); 