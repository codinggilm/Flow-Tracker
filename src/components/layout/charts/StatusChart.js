import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { fetchTickets } from '../../../redux/actions';
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

    componentDidMount () {
        this.props.fetchTickets();
    }

    calculateChartData = () => {
		const { tickets } = this.props;

		let open = tickets.filter(ticket => ticket.status === 'Open');
		let inProgress = tickets.filter(ticket => ticket.status === 'In Progress');
		let closed = tickets.filter(ticket => ticket.status === 'Closed');
		// let high = tickets.filter(ticket => ticket.priority === 'High');

		const result = [open.length, inProgress.length, closed.length];

		let data = {
			labels: ["Open", "In Progress", "Closed"],
            datasets: [
                {
                    label: "number of tickets",
                    data: result,
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)", // red
                        "rgba(98,  182, 239,0.4)", // blue
                        "rgba(113, 205, 205,0.4)", // green
                        "rgba(255, 218, 128,0.4)", // yellow
                        "rgba(170, 128, 252,0.4)",  // pruple
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)", // red
                        "rgba(98,  182, 239, 1)", // blue
                        "rgba(113, 205, 205, 1)", // green
                        "rgba(255, 218, 128, 1)", // yellow
                        "rgba(170, 128, 252, 1)",   // pruple
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
    }
}

const mapDispatchToProps = { fetchTickets }

export default connect(mapStateToProps, mapDispatchToProps)(StatusChart); 