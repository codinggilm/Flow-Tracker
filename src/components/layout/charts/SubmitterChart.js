import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
state = {
  dataDoughnut: {
    labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
    datasets: [
      {
        data: [15, 2, 11, 20],
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
}

render() {
    return (
    <MDBContainer className="chart-container">
      {/* <h3 className="mt-5">Doughnut chart</h3> */}
      <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} />
    </MDBContainer>
    );
  }
}

export default ChartsPage;