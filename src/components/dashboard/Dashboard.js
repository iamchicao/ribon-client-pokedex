import React, { Component } from "react";
import List from "../list/List";
import Search from "../search/Search";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      searched: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    let url = "http://127.0.0.1:3000/api/v1/pokemons";
    const res = await axios.get(url);
    await this.setState({ pokemons: res.data });
  }

  handleInput = e => {
    console.log(this.state.searched);
    this.setState({ searched: e.target.value });
  };

  filter() {
    let filtered = this.state.pokemons.filter(pokemon => {
      return pokemon.name
        .toLowerCase()
        .includes(this.state.searched.toLowerCase());
    });
    return filtered;
  }

  render() {
    let filtered = this.filter();

    return (
      <div>
        <div className="row mt-4">
          <Search handleInput={this.handleInput} />
          <Link to={"/pokemon/new"}>
            <button className="btn btn-success">Create a new pokemon!</button>
          </Link>
        </div>
        <div className="mt-4">
          <>
            <List pokemons={filtered} />
          </>
        </div>
      </div>
    );
  }
}
