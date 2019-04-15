import React, { Component } from "react";
import List from "../list/List";
import Search from "../search/Search";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPokemons } from "../../store/actions/pokemonActions";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searched: ""
    };
  }

  componentWillMount() {
    console.log(this.props.pokemons);
    this.props.fetchPokemons();
  }



  handleInput = e => {
    this.setState({ searched: e.target.value });
  };

  filter() {
    let filtered = this.props.pokemons.filter(pokemon => {
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

const mapStateToProps = state => {
  return {
    pokemons: state.pokemons.items
  };
};

export default connect(
  mapStateToProps,
  { fetchPokemons }
)(Dashboard);
