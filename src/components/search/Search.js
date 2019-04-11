import React from "react";

export default function Search(props) {
  console.log(props)
  return (
    <form className="form-fixed">
      <input
        onChange={props.handleInput}
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </form>
  );
}
