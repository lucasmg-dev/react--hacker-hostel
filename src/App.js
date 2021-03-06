import React, { Component } from "react";
import Bookings from "./components/Bookings";
import Meals from "./components/Meals";
import Error from "./components/Error";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: [],
    };

    this.handleGetMeals = this.handleGetMeals.bind(this);
  }

  handleGetMeals(data, errors) {
    this.setState({
      data: data,
      errors: errors,
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
          <Error errors={this.state.errors} />
          <Meals data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
