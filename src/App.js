import React, { Component } from "react";
import Bookings from "./components/Bookings";
import Meals from "./components/Meals";
import Error from "./components/Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackers: {},
    };

    this.handleGetMeals = this.handleGetMeals.bind(this);
  }

  handleGetMeals(hackers) {
    this.setState({
      hackers: hackers,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <center>
          <h2>Hacker Hostel</h2>
        </center>
        <div className="container">
          <Bookings handleGetMeals={this.handleGetMeals} />
          <Error hackers={this.state.hackers} />
          <Meals hackers={this.state.hackers} />
        </div>
      </div>
    );
  }
}

export default App;
