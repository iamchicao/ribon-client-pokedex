import React from "react";

const Checkbox = props => {
  // console.log(props);
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        value={props.value}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label className="form-check-label">{props.name}</label>
    </div>
  );
};

export default Checkbox;
