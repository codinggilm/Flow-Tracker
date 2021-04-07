import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { fetchTickets } from '../../../redux/actions';
import '../../../scss/components/layouts/BarChart.scss';

class PriorityChart extends React.Component {
  	state = {
		myData: {},
  	}

  	componentDidMount () {
		this.props.fetchTickets();
		this.calculateChartData();
	}

	calculateChartData = () => {
		const { tickets } = this.props;

		let none = tickets.filter(ticket => ticket.priority === 'None');
		let low = tickets.filter(ticket => ticket.priority === 'Low');
		let medium = tickets.filter(ticket => ticket.priority === 'Medium');
		let high = tickets.filter(ticket => ticket.priority === 'High');

		const result = [none.length, low.length, medium.length, high.length];


		this.setState({
			myData: {
				labels: ["None", "Low", "Medium", "High"],
				datasets: [
					{
						label: "number of tickets",
						data: result,
						backgroundColor: [
							"rgba(255, 134,159,0.4)",
							"rgba(98,  182, 239,0.4)",
							"rgba(255, 218, 128,0.4)",
							"rgba(113, 205, 205,0.4)",
							"rgba(170, 128, 252,0.4)",
							"rgba(255, 177, 101,0.4)"
						],
						borderWidth: 2,
						borderColor: [
							"rgba(255, 134, 159, 1)",
							"rgba(98,  182, 239, 1)",
							"rgba(255, 218, 128, 1)",
							"rgba(113, 205, 205, 1)",
							"rgba(170, 128, 252, 1)",
							"rgba(255, 177, 101, 1)"
						]
					}
				  ]
			},
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
		})

		
	}


  	render() {

		return (
		<MDBContainer className="chart-container">
			<Bar data={this.state.myData} options={this.state.barChartOptions} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PriorityChart); 