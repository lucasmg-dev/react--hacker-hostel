import React, { Component } from "react";
import { PropTypes } from "prop-types";

const Meals = ({ data }) => {
  const list = [];

  Object.keys(data)
    .sort()
    .map((date) => {
      const hackers = data[date].hackers;
      hackers.map((hacker) =>
        list.push({
          type: "morning",
          text: `Breakfast for ${hacker} on ${date}`,
        })
      );
      hackers.map((hacker) =>
        list.push({
          type: "afternoon",
          text: `Lunch for ${hacker} on ${date}`,
        })
      );
      hackers.map((hacker) =>
        list.push({
          type: "night",
          text: `Dinner for ${hacker} on ${date}`,
        })
      );
    });

  return (
    <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
      <ol id="list">
        {list.map((item, i) => (
          <div key={`item-${i}`}>
            <li className={item.type}>{item.text}</li>
          </div>
        ))}
      </ol>
    </div>
  );
};
export default Meals;
