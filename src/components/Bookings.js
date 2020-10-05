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
    this.handleDateInfo = this.handleDateInfo.bind(this);
    this.handleGuestInfo = this.handleGuestInfo.bind(this);
  }

  getDates({ from, to }) {
    const dates = [];
    let currentDate = from;
    while (currentDate <= to) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  dateFormat(d) {
    const date = new Date(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    );
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleDateString("en-US", { month: "numeric" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });
    return `${year}-${month}-${day}`;
  }

  handleGuestInfo(ev) {
    if (ev.target.value !== "") {
      this.setState({
        hackers: ev.target.value,
      });
    }
  }

  handleDateInfo(ev) {
    if (ev.target.value !== "") {
      this.setState({
        datesRange: ev.target.value,
      });
    }
  }

  isValidateAndCorrectDate(from, to) {
    if (!isValidDate(from)) return false;
    if (!isValidDate(to)) return false;
    if (from > to) return false;
    return true;
  }

  _handleGetMeals() {
    if (this.state.hackers === "" || this.state.datesRange === "") return;
    const datesRange = this.state.datesRange.split(/\r?\n/);
    const hackers = this.state.hackers.split(/\r?\n/);
    const errors = [];

    const data = datesRange.reduce((acc, el, i) => {
      const hacker = hackers[i];
      const dates = el.split(" ");
      const from = new Date(dates[0]);
      const to = new Date(dates[2]);

      if (this.isValidateAndCorrectDate(from, to)) {
        const allDates = this.getDates({
          from,
          to,
        });

        allDates.forEach((d) => {
          const formatedDate = this.dateFormat(d);
          if (
            acc[formatedDate] &&
            acc[formatedDate].hasOwnProperty("hackers")
          ) {
            acc[formatedDate].hackers.push(hacker);
          } else {
            acc[formatedDate] = {
              hackers: [hacker],
            };
          }
        });
      } else {
        errors.push(hacker);
      }

      return acc;
    }, {});

    this.props.handleGetMeals(data, errors);
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
          onChange={this.handleGuestInfo}
        />
        <TextField
          className="col-md-6"
          multiline
          rows="4"
          placeholder="Enter the date range for each hacker's stay (one range per line)"
          value={this.state.datesRange}
          onChange={this.handleDateInfo}
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
