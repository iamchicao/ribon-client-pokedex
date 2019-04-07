import React, { Component } from "react";
import List from "../list/List";
import Search from "../search/Search";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <Search />
        <div className="col">
          <List />
        </div>
      </div>
    );
  }
}
