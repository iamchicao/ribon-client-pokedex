import React from "react";

const Select = props => {
    // console.log(props)
    return (
    <option onChange={props.handleSelect} value={props.name}>
      {props.name}
    </option>
  );
};

export default Select;
