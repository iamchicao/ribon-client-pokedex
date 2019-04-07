import React, { Component } from "react";

export default class Search extends Component {
  render() {
    return (
      <form class="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>
    );
  }
}
