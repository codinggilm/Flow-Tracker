import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from 'react-redux';
import { fetchTickets } from '../../../redux/actions';
import '../../../scss/components/layouts/BarChart.scss';

class TypeChart extends React.Component {

	componentDidMount () {
        this.props.fetchTickets();
    }

	calculateChartData = () => {
		const { tickets } = this.props;

		let bugs = tickets.filter(ticket => ticket.type === 'Bugs/Errors');
		let featureRequests = tickets.filter(ticket => ticket.type === 'Feature Requests');
		let otherComments = tickets.filter(ticket => ticket.type === 'Other Comments');
		let trainingRequests = tickets.filter(ticket => ticket.type === 'Training/Documents Requests ');

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
    }
}

const mapDispatchToProps = { fetchTickets }

export default connect(mapStateToProps, mapDispatchToProps)(TypeChart); 