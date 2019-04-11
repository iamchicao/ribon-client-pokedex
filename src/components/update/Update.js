import React, { Component } from "react";
import axios from "axios";
import Checkbox from "../common/Checkbox";
import Select from "../common/Select";

export default class Update extends Component {
  state = {
    id: this.props.match.params.id,
    name: " ",
    sprite_front_url: " ",
    types: [],
    evolves_from: " ",
    formTypes: [],
    haveEvolution: false,
    evolutionsList: [],
    evolutionSelected: null
  };

  componentDidMount() {
    this.setInitialMenuState();
  }

  async setInitialMenuState() {
    let { formTypes, evolutionsList, pokemon } = await this.fetchData();
    let pokeIds = pokemon.data.types.map(type => {
      return type.id;
    });

    this.setState({
      formTypes: formTypes.data.map(type => {
        type.checked = false;
        if (pokeIds.includes(type.id)) {
          console.log(type.id);
          type.checked = true;
        }
        return type;
      }),
      evolutionsList: evolutionsList.data,
      name: pokemon.data.name,
      sprite_front_url: pokemon.data.sprite_front_url
    });

    if (pokemon.data.evolves_from != null) {
      this.setState({
        haveEvolution: true,
        evolutionSelected: evolutionsList.data.find(
          evolution => evolution.id === pokemon.data.evolves_from
        ).name
      });
    }
    console.log(this.state.evolutionSelected);
  }

  async fetchData() {
    console.log(this.state.id);
    const pokemon = await axios.get(
      `http://127.0.0.1:3000/api/v1/pokemons/${this.state.id}`
    );
    const formTypes = await axios.get("http://127.0.0.1:3000/api/v1/types");
    const evolutionsList = await axios.get(
      "http://127.0.0.1:3000/api/v1/pokemons"
    );
    return { formTypes, evolutionsList, pokemon };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.state.types.length = 0;
    this.state.formTypes.forEach(formType => {
      if (formType.checked) {
        this.state.types.push(formType.id);
      }
    });

    this.state.evolutionsList.forEach(evolution => {
      if (this.state.evolutionSelected === evolution.name) {
        this.state.evolves_from = evolution.id;
      }
    });

    let body = {
      name: this.state.name.toLowerCase(),
      sprite_front_url: this.state.sprite_front_url,
      types: this.state.types,
      evolves_from: null
    };

    if (this.state.haveEvolution) {
      body.evolves_from = this.state.evolves_from;
    }

    console.log(body);

    try {
      await axios.put(
        `http://127.0.0.1:3000/api/v1/pokemons/${this.state.id}`,
        body
      );
      await alert("Seu pokemon foi criado!");
      await this.props.history.push("/");
    } catch (err) {
      alert("Algo de errado aconteceu!");
    }
  };

  renderEvolutionsList() {
    return this.state.haveEvolution ? (
      <div className="form-group">
        <label>Evolves From</label>
        <select
          name="evolutionSelected"
          value={this.state.evolutionSelected}
          onChange={e => this.handleSelect(e)}
          className="custom-select"
        >
          {this.state.evolutionsList.map(pokemon => {
            return <Select key={pokemon.id} {...pokemon} />;
          })}
        </select>
      </div>
    ) : null;
  }

  handleOnChangeInputsText = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleTypesCheckbox = event => {
    let types = this.state.formTypes;
    types.forEach(type => {
      if (type.id === Number(event.target.value)) {
        type.checked = event.target.checked;
      }
    });
    this.setState({ formTypes: types });
  };

  handleHaveEvolution = event => {
    console.log(event.target.checked);
    this.setState({ haveEvolution: event.target.checked });
  };

  handleSelect = event => {
    this.setState({ evolutionSelected: event.target.value });
  };

  render() {
    return (
      <div className="col mt-3">
        <div className="card">
          <div className="card-header">
            <div className="row ">
              <div className="col-5">
                <h5>New Pokémon</h5>
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
                  onChange={e => this.handleOnChangeInputsText(e)}
                />
              </div>

              <div className="form-group">
                <label>Front Sprite URL</label>
                <input
                  name="sprite_front_url"
                  className="form-control"
                  value={this.state.sprite_front_url}
                  onChange={e => this.handleOnChangeInputsText(e)}
                />
              </div>

              <div className="form-group">
                <label>Types</label>
                <div className="form-check mr-2">
                  <>
                    {this.state.formTypes.map(type => {
                      return (
                        <Checkbox
                          key={type.id}
                          value={type.id}
                          onChange={this.handleTypesCheckbox}
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
