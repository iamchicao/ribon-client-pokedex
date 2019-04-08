import React, { Component } from "react";
import axios from "axios";
import Checkbox from "./Checkbox";
import Select from "./Select";

export default class Create extends Component {
  state = {
    name: " ",
    front_sprite_url: " ",
    types: [],
    evolves_from: " ",
    formTypes: [],
    evolutionsList: [],
    evolutionSelected: " "
  };

  componentDidMount() {
    this.setInitialMenuState();
  }

  async setInitialMenuState() {
    let { formTypes, evolutionsList } = await this.fetchData();

    this.setState({
      formTypes: formTypes.data.map(type => {
        type.checked = false;
        return type;
      }),
      evolutionsList: evolutionsList.data
    });
  }

  async fetchData() {
    const formTypes = await axios.get("http://127.0.0.1:3000/api/v1/types");
    const evolutionsList = await axios.get(
      "http://127.0.0.1:3000/api/v1/pokemons"
    );
    return { formTypes, evolutionsList };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.state.types.length = 0;
    this.state.formTypes.map(formType => {
      if (formType.checked) {
        this.state.types.push(formType.id);
      }
    });

    this.state.evolutionsList.map(evolution => {
      if (this.state.evolutionSelected == evolution.name) {
        this.state.evolves_from = evolution.id;
      }
    });

    const body = {
      name: this.state.name.toLocaleLowerCase(),
      front_sprite_url: this.state.front_sprite_url,
      types: this.state.types,
      evolves_from: this.state.evolves_from
    };
    try {
      await axios.post("http://127.0.0.1:3000/api/v1/pokemons", body);
      await alert('Seu pokemon foi criado!')
      await this.props.history.push("/");
    }
    catch (err) {
      alert("Algo de errado aconteceu!")
    }
  };

  handleOnChangeInputsText = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCheckbox = event => {
    let types = this.state.formTypes;
    types.forEach(type => {
      if (type.id === Number(event.target.value)) {
        type.checked = event.target.checked;
      }
    });
    this.setState({ formTypes: types });
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
                  onChange={e => this.handleOnChangeInputsText(e)}
                />
              </div>
              <div className="form-group">
                <label>Front Sprite URL</label>
                <input
                  name="front_sprite_url"
                  className="form-control"
                  value={this.state.front_sprite_url}
                  onChange={e => this.handleOnChangeInputsText(e)}
                />
              </div>
              <div className="form-group">
                <label>Types</label>
                <div className="form-check form-check-inline">
                  {this.state.formTypes.map(type => {
                    return (
                      <Checkbox
                        handleCheckbox={this.handleCheckbox}
                        {...type}
                      />
                    );
                  })}
                  <></>
                </div>
              </div>
              <div className="form-group">
                <label>Evolves From</label>
                <select
                  name="evolutionSelected"
                  value={this.state.evolutionSelected}
                  onChange={e => this.handleOnChangeInputsText(e)}
                  className="custom-select"
                >
                  {this.state.evolutionsList.map(pokemon => {
                    return <Select {...pokemon} />;
                  })}
                </select>
              </div>
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
