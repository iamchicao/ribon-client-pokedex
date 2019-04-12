import React from "react";

const Select = props => {
    return (
    <option onChange={props.handleInputChange} value={props.name}>
      {props.name}
    </option>
  );
};

export default Select;
