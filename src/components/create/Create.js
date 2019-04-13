import React, { Component } from "react";
import Checkbox from "../common/Checkbox";
import Select from "../common/Select";

import { connect } from "react-redux";
import {
  createPokemon,
  fetchPokemons,
  clearErrors
} from "../../store/actions/pokemonActions";
import { fetchPokeTypes } from "../../store/actions/pokeTypesActions";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      name: "",
      imgUrl: " ",
      ancestorSelected: "",
      evolvesFromAnotherPokemon: false
    };
    console.log("construindo");
  }

  componentWillMount() {
    this.props.fetchPokeTypes();
    this.props.fetchPokemons();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pokemons !== this.props.pokemons &&
      this.props.pokemons.length > 0
    ) {
      this.setState({
        ancestorSelected: this.props.pokemons[0].name
      });
    }
    if (this.props.errors != null) {
      alert("Um erro aconteceu");
      this.props.clearErrors();
    }
    if (this.props.success) {
      alert("success");
      this.props.history.push("/");
    }
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
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleHaveEvolution = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.props);

    let types = [];

    this.props.types.filter(type => {
      if (type.checked === true) {
        types.push(type.id);
      }
      return type;
    });

    this.setState({ types: types });

    let body = {
      name: this.state.name.toLowerCase(),
      sprite_front_url: this.state.imgUrl,
      types: types,
      evolves_from: null
    };

    if (this.state.evolvesFromAnotherPokemon) {
      this.props.pokemons.filter(pokemon => {
        if (pokemon.name === this.state.ancestorSelected) {
          body.evolves_from = pokemon.id;
        }
        return pokemon;
      });
    }

    this.props.createPokemon(body);
  };

  renderEvolutionsList() {
    return this.state.evolvesFromAnotherPokemon &&
      this.props.pokemons.length > 0 ? (
      <div className="form-group">
        <label>Evolves From</label>
        <select
          name="ancestorSelected"
          value={this.state.ancestorSelected}
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
    console.log("rendering");
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
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

              <div className="form-group">
                <label>Front Sprite URL</label>
                <input
                  name="imgUrl"
                  className="form-control"
                  value={this.state.imgUrl}
                  onChange={e => this.handleInputChange(e)}
                />
              </div>

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
                <label>Evolves from another pokemon&ensp;</label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    name="evolvesFromAnotherPokemon"
                    type="checkbox"
                    value={this.state.evolvesFromAnotherPokemon}
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
    pokemons: state.pokemons.items,
    errors: state.pokemons.errors,
    success: state.pokemons.success
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
    },
    clearErrors: () => {
      dispatch(clearErrors());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
