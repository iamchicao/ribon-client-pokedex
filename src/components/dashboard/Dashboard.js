import React, { Component } from "react";
import List from "../list/List";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <List />
        </div>
      </div>
    );
  }
}
