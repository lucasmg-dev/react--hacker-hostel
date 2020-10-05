import React, { Component } from "react";
import { PropTypes } from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const isValidDate = (d) => d instanceof Date && !isNaN(d.getTime());

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hackers: "",
      datesRange: "",
    };

    this._handleGetMeals = this._handleGetMeals.bind(this);
  }

  _handleGetMeals() {
    const datesRange = this.state.datesRange.split(/\r?\n/);
    const hackers = this.state.hackers.split(/\r?\n/);

    const data = datesRange.reduce((acc, el, i) => {
      const hacker = hackers[i];
      const dates = el.split(" ");
      const from = new Date(dates[0]);
      const to = new Date(dates[2]);
      if (isValidDate(from) && isValidDate(to)) {
        acc[hacker] = {
          from,
          to,
        };
      } else {
        acc[hacker] = false;
      }
      return acc;
    }, {});

    this.props.handleGetMeals(data);
  }

  render() {
    return (
      <div className="row">
        <TextField
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the hacker list (one hacker per line)"
          value={this.state.hackers}
          onChange={(ev) => this.setState({ hackers: ev.target.value })}
        />
        <TextField
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the date range for each hacker's stay (one range per line)"
          value={this.state.datesRange}
          onChange={(ev) => this.setState({ datesRange: ev.target.value })}
        />
        <Button
          variant="outlined"
          color="primary"
          className="block-center"
          onClick={this._handleGetMeals}
        >
          Get Meals Schedule
        </Button>
      </div>
    );
  }
}

Bookings.propTypes = {
  handleGetMeals: PropTypes.func,
};

export default Bookings;
