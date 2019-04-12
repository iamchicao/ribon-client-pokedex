import React, { Component } from "react";
import Checkbox from "../common/Checkbox";
import Select from "../common/Select";

import { connect } from "react-redux";
import {
  createPokemon,
  fetchPokemons
} from "../../store/actions/pokemonActions";
import { fetchPokeTypes } from "../../store/actions/pokeTypesActions";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imgUrl: "",
      evolutionSelected: "",
      haveEvolution: false
    };
  }

  componentWillMount() {
    this.props.fetchPokeTypes();
    this.props.fetchPokemons();
    this.props.types.map(type => (type.checked = false));
  }

  handleCheckboxChange = e => {
    this.props.types.filter(type => {
      if (type.name === e.target.value) {
        type.checked = e.target.checked;
      }
      return type;
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleHaveEvolution = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let types = [];

    this.props.types.filter(type => {
      if (type.checked === true) {
        types.push(type.id);
      }
      return type;
    });
    console.log(this.state);
    console.log(types);
  };

  renderEvolutionsList() {
    return this.state.haveEvolution && this.props.pokemons.length > 0 ? (
      <div className="form-group">
        <label>Evolves From</label>
        <select
          name="evolutionSelected"
          value={this.state.evolutionSelected}
          onChange={e => this.handleInputChange(e)}
          className="custom-select"
        >
          Select
          {this.props.pokemons.map(pokemon => {
            return <Select key={pokemon.id} {...pokemon} />;
          })}
        </select>
      </div>
    ) : null;
  }

  render() {
    return (
      <div className="col mt-3">
        <div className="card">
          <div className="card-header">
            <div className="row ">
              <div className="col-5">
                <h5>Novo Pokémon</h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={e => this.handleSubmit(e)}>
              {/* <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={e => this.handleInputChange(e)}
                />
              </div> */}

              {/* <div className="form-group">
                <label>Front Sprite URL</label>
                <input
                  name="sprite_front_url"
                  className="form-control"
                  value={this.state.sprite_front_url}
                  onChange={e => this.handleInputChange(e)}
                />
              </div> */}

              <div className="form-group">
                <label>Types</label>
                <div className="form-check">
                  <>
                    {this.props.types.map(type => {
                      return (
                        <Checkbox
                          key={type.id}
                          onChange={this.handleCheckboxChange}
                          value={type.name}
                          {...type}
                        />
                      );
                    })}
                  </>
                </div>
              </div>

              <div className="form-group">
                <label>Have evolution&ensp;</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    name="haveEvolution"
                    type="checkbox"
                    checked={this.state.haveEvolution}
                    onChange={this.handleHaveEvolution}
                  />
                </div>
              </div>

              {this.renderEvolutionsList()}

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    types: state.pokeTypes.items,
    pokemons: state.pokemons.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createPokemon: pokemon => {
      dispatch(createPokemon(pokemon));
    },
    fetchPokeTypes: () => {
      dispatch(fetchPokeTypes());
    },
    fetchPokemons: () => {
      dispatch(fetchPokemons());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
