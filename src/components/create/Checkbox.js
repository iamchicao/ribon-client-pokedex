import React, { Component } from "react";

const Checkbox = props => {
  // console.log(props);
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        checked={props.checked}
        onChange={props.handleCheckbox}
        value={props.id}
      />
      <label className="form-check-label">{props.name}</label>
    </div>
  );
};

export default Checkbox;
