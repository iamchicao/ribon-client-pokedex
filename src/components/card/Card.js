import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Card extends Component {
  state = {
    name: "",
    spriteUrl: ""
  };

  componentDidMount() {
    const { name, id, spriteUrl } = this.props;
    this.setState({ name, spriteUrl });
  }

  render() {
    // const { name } = this.props;

    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <div className="card">
          <div className="card-header">
            <h5>{this.state.name.toUpperCase()}</h5>
          </div>
          <div className="card-body">
            <img
              className="card-img-top rounded mx-auto at-2"
              src={this.state.spriteUrl}

            />
          </div>
        </div>
      </div>
    );
  }
}
