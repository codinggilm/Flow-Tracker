import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { fetchTickets } from '../../../redux/actions';
import '../../../scss/components/layouts/BarChart.scss';

class PriorityChart extends React.Component {
	
	componentDidMount = () => {
        this.props.fetchTickets(this.props.currentUser.companyId);
    }


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

		let none = tickets.filter(ticket => ticket.priority === 'None');
		let low = tickets.filter(ticket => ticket.priority === 'Low');
		let medium = tickets.filter(ticket => ticket.priority === 'Medium');
		let high = tickets.filter(ticket => ticket.priority === 'High');

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
			
				{/* <Bar data={this.state.myData} options={this.state.barChartOptions} /> */}
				<Bar data={this.calculateChartData()} options={this.state.barChartOptions} />
			
		</MDBContainer>
		);
  	} 
}

const mapStateToProps = state => {
  	return {
	  	tickets: state.tickets.tickets,
		currentUser: state.auth.currentUser  
  	}
}

const mapDispatchToProps = { fetchTickets }

export default connect(mapStateToProps, mapDispatchToProps)(PriorityChart); 