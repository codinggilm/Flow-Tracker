import React from "react";
import { connect } from 'react-redux';
import { fetchTickets, fetchProjects, fetchUserProjects } from '../../../redux/actions';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact"; 
import '../../../scss/components/layouts/BarChart.scss';
import '../../../scss/_config.scss';

class ProjectsChart extends React.Component {

	componentDidMount () {
		const { currentUser } = this.props;

		if (currentUser.role !== 'Admin') {
			this.props.fetchUserProjects(currentUser.id)
		} 

		this.props.fetchTickets(currentUser.companyId);
		this.props.fetchProjects(currentUser.companyId);
	}


	calculateChartData = () => {
		const { tickets, projects, userProjects, currentUser } = this.props;
		let projectIdOfTickets = [];
		let numberOfTickets = [];
		let projectTitles = [];
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


		// Loop trough all the user's tickets and create array with the project Id of each ticket
		for (let i=0; i<userTickets.length; i++) {
			projectIdOfTickets.push(userTickets[i].projectId)
		}
		
		// Save each ticket's project id and the amount of times it appears
		const countDuplicates = (originalArray) => {

			let resultArr = [];
			
			// Copy of original array
			let copy = originalArray.slice(0);

			for (let i=0; i<originalArray.length; i++) {
				let counter = 0;

				// Compare elements, save value and count if present in both arrays
				for (let n=0; n<copy.length; n++) {
					if (originalArray[i] === copy[n]) {
						counter++;
						// remove duplicate item
						delete copy[n];
					}
				}

				if (counter > 0) {
					resultArr.push({
						projectId: originalArray[i],
						amount: counter 
					})
				}
			}
			
			return resultArr;
		}

		const ticketData = countDuplicates(projectIdOfTickets);

		// Loop trough all of the user's projects and extract the titles of projects which have tickets on them
		
		// If user is an Admin, use all the company's 
		let allProjects;
		if(currentUser.role === 'Admin') {
			allProjects = projects
		} else {
			allProjects = userProjects
		}

		for (let i=0; i<allProjects.length; i++) {
			for (let n=0; n<ticketData.length; n++) {
				if (allProjects[i].projectID === ticketData[n].projectId || allProjects[i].id === ticketData[n].projectId) {

					projectTitles.push(allProjects[i].project || allProjects[i].title);
					numberOfTickets.push(ticketData[n].amount);
					// finalTicketData.push({
					// 	project: projects[i].title,
					// 	tickets: ticketData[n].amount
					// })
				}
			}
		}


		let data = {
			labels: projectTitles,
			// labels: ['project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1','project1',],
			datasets: [
				{
					data: numberOfTickets,
					// data: [1,2,55,44,10,22,4,5,24,36,7,12,16,20,11,2,5,6,24],
					backgroundColor: [
						"#F7464A",
						"#46BFBD",
						"#FDB45C",
						"#949FB1",
						"#4D5360",
						"#AC64AD",
						"#00b4d8",
						"#ff8500",
						"#87bba2",
						"#892b64",
						"#ffb5a7",
						"#f4acb7",
						"#239b95",
						"#f2536d",
						"#e88bb6",
						"#a6afd8",
						"#e0e1e1",
						"#6a040f",
						"#23456c",
						"#55d653",
					],
					hoverBackgroundColor: [
						"#FF5A5E",
						"#5AD3D1",
						"#FFC870",
						"#A8B3C5",
						"#616774",
						"#DA92DB",
						"#90e0ef",
						"#ff9e00",
						"#c9e4ca",
						"#ba5994",
						"#fcd5ce",
						"#ffcad4",
						"#27aba4",
						"#f3637a",
						"#b7c0ee",
						"#ff99c8",
						"#f6f7f8",
						"#9d0208",
						"#274c77",
						"#5eeb5b",
					]
				}
			]
		}

		return data;
	}

	render() {
		return (
			<MDBContainer>
				{/* <h3 className="mt-5">Pie chart</h3> */}
				<Pie data={this.calculateChartData()} options={{ responsive: true }} />
			</MDBContainer>
		);
	}
}


const mapStateToProps = state => {
	return {
		tickets: state.tickets.tickets,
		projects: state.projects.projects,
		userProjects: state.projects.userProjects,
		currentUser: state.auth.currentUser,
	}
}

const mapDispatchToProps = { fetchTickets, fetchProjects, fetchUserProjects }

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsChart); 