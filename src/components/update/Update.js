import React, { Component } from "react";
import Checkbox from "../common/Checkbox";
import Select from "../common/Select";

import { connect } from "react-redux";
import {
  updatePokemon,
  fetchPokemons,
  fetchPokemonById
} from "../../store/actions/pokemonActions";
import {
  clearErrors,
  clearSuccess
} from "../../store/actions/responseHandlerActions";
import { fetchPokeTypes } from "../../store/actions/pokeTypesActions";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      typesCheckbox: [],
      name: "",
      imgUrl: " ",
      ancestorSelected: "",
      evolvesFromAnotherPokemon: false
    };
  }

  componentWillMount() {
    this.props.fetchPokemonById(this.props.match.params.id);
    this.props.fetchPokeTypes();
    this.props.fetchPokemons();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pokemons !== this.props.pokemons &&
      this.props.pokemons.length > 0 &&
      this.props.activePokemon.name.length > 0
    ) {
      this.setState({
        ancestorSelected: this.props.pokemons[0].name,
        name: this.props.activePokemon.name,
        imgUrl: this.props.activePokemon.sprite_front_url
      });
      this.selectEvolvesFrom();
      this.setTypesCheckbox();
    }
    if (this.props.errors != null) {
      alert("Um erro aconteceu");
      this.props.clearErrors();
    }
    if (this.props.success) {
      alert("success");
      this.props.clearSuccess();
      this.props.history.push("/");
    }
  }

  selectEvolvesFrom = () => {
    if (this.props.activePokemon.evolves_from != null) {
      let ancestorSelected = this.props.pokemons.find(
        evolution => evolution.id === this.props.activePokemon.evolves_from
      );

      this.setState({
        evolvesFromAnotherPokemon: true,
        ancestorSelected: ancestorSelected.name
      });
    }
  };

  setTypesCheckbox = () => {
    let pokeIds = this.props.activePokemon.types.map(type => {
      return type.id;
    });

    let typesCheckbox = this.props.types.map(type => {
      type.checked = false;
      if (pokeIds.includes(type.id)) {
        type.checked = true;
      }
      return type;
    });

    this.setState({
      typesCheckbox: typesCheckbox
    });
  };

  handleCheckboxChange = e => {
    let types = this.state.typesCheckbox;
    types.forEach(type => {
      if (type.name === e.target.value) {
        type.checked = e.target.checked;
      }
    });

    this.setState({ typesCheckbox: types });
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

  handleSubmit = async e => {
    e.preventDefault();
    let types = [];

    this.props.types.filter(type => {
      if (type.checked === true) {
        types.push(type.id);
      }
      return type;
    });

    this.setState({ types: types });

    let pokemonData = {
      name: this.state.name.toLowerCase(),
      sprite_front_url: this.state.imgUrl,
      types: types,
      evolves_from: null
    };

    if (this.state.evolvesFromAnotherPokemon) {
      this.props.pokemons.filter(pokemon => {
        if (pokemon.name === this.state.ancestorSelected) {
          pokemonData.evolves_from = pokemon.id;
        }
        return pokemon;
      });
    }

    let id = this.props.match.params.id;

    this.props.updatePokemon(id, pokemonData);
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
                    {this.state.typesCheckbox.map(type => {
                      return (
                        <Checkbox
                          key={type.id}
                          checked={type.checked}
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
    errors: state.responseHandler.errors,
    success: state.responseHandler.success,
    activePokemon: state.details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePokemon: (id, pokemonData) => {
      dispatch(updatePokemon(id, pokemonData));
    },
    fetchPokeTypes: () => {
      dispatch(fetchPokeTypes());
    },
    fetchPokemons: () => {
      dispatch(fetchPokemons());
    },
    clearErrors: () => {
      dispatch(clearErrors());
    },
    clearSuccess: () => {
      dispatch(clearSuccess());
    },
    fetchPokemonById: id => {
      dispatch(fetchPokemonById(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Update);
