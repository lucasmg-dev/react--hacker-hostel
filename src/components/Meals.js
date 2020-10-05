import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

const Meals = ({ hackers }) => {
  
  const getDates = ({ from, to }) => {
    const dates = []
    let currentDate = from
    while (currentDate <= to) {
      dates.push(new Date(currentDate).toUTCString())
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
  }

  const parsedHackers = Object.keys(hackers).reduce( (acc, key) => {
    if (hackers[key]) {
      const dates = getDates(hackers[key])
      acc[key] = dates
      console.log(dates)
    }
    return acc
  }, {})

  const dateFormat = d => {
    const date = new Date(d)
    const day = date.toLocaleDateString('en-US', { day: '2-digit'})
    const month = date.toLocaleDateString('en-US', { month: '2-digit'})
    const year = date.toLocaleDateString('en-US', { year: 'numeric'})
    return `${year}-${month}-${day}`
  }

  const list = Object.keys(parsedHackers).map( key => {
    return parsedHackers[key].map( d => {
      return (
	<div>
	  <li className="morning">Breakfast for {key} {dateFormat(d)}</li>
	  <li className="afternoon">Lunch for {key} {dateFormat(d)}</li>
	  <li className="night">Dinner for {key} {dateFormat(d)}</li>
	</div>
      )
    })
  })

  return (
    <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12">
      <ol id="list">
	{list}
      </ol>
    </div>
  );
};
export default Meals;
