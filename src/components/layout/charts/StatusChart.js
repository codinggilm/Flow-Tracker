import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { fetchTickets, fetchUserProjects } from '../../../redux/actions';
import '../../../scss/components/layouts/BarChart.scss';

class StatusChart extends React.Component {
    
    state = {
	    barChartOptions: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
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

		let open = userTickets.filter(ticket => ticket.status === 'Open');
		let inProgress = userTickets.filter(ticket => ticket.status === 'In Progress');
		let resolved = userTickets.filter(ticket => ticket.status === 'Resolved');
		let moreInfo = userTickets.filter(ticket => ticket.status === 'Needs more info');

		const result = [open.length, inProgress.length, resolved.length, moreInfo.length];

		let data = {
			labels: ["Open", "In Progress", "Resolved", "Needs more info"],
            datasets: [
                {
                    label: "number of tickets",
                    data: result,
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)", // red
                        "rgba(98,  182, 239,0.4)", // blue
                        "rgba(113, 205, 205,0.4)", // green
                        "rgba(255, 218, 128,0.4)", // yellow
                        "rgba(170, 128, 252,0.4)",  // purple
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)", // red
                        "rgba(98,  182, 239, 1)", // blue
                        "rgba(113, 205, 205, 1)", // green
                        "rgba(255, 218, 128, 1)", // yellow
                        "rgba(170, 128, 252, 1)",   // purple
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

export default connect(mapStateToProps, mapDispatchToProps)(StatusChart); 