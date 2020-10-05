import React from "react";
import { PropTypes } from "prop-types";

const Error = ({ hackers }) => {
  const errors = [];

  Object.keys(hackers).map((k) => {
    if (!hackers[k]) errors.push(k);
  });

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 error">
      <div id="list">
        {errors.map((name) => (
          <div className="error-msg">
            <i className="fa fa-times-circle"></i>
            <p>Error! No menu generated for {name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Error;
