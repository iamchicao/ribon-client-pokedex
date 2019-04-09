import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Details extends Component {
  state = {
    name: "",
    spriteUrl: "",
    id: "",
    types: [],
    evolutions: []
  };

  componentDidUpdate(prevProps) {
    const idPrev = prevProps.match.params;
    const idAct = this.props.match.params;
    
    if (idPrev !== idAct) {
      this.fetchData();
    }
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    console.log(this.props);
    const { id } = this.props.match.params;
    const pokemonUrl = `http://localhost:3000/api/v1/pokemons/${id}`;
    const res = await axios.get(pokemonUrl);
    this.setState({
      name: res.data.name,
      spriteUrl: res.data.sprite_front_url,
      types: res.data.types.map(type => type.name),
      id,
      evolutions: this.getEvolutions(res.data.evolutions)
    });
  }

  getEvolutions(evolutions) {
    let result = [];
    evolutions.forEach(evolution => {
      result.push(evolution);
      if (evolution.evolutions.length > 0) {
        result.push(this.getEvolutions(evolution.evolutions));
      }
    });
    return result.flat();
  }

  handleDelete = async () => {
    await axios.delete(
      `http://localhost:3000/api/v1/pokemons/${this.state.id}`
    );
    await this.props.history.push("/");
  };

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{this.state.name}</h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row allign-items-center">
              <div className="col-md-3">
                <img
                  src={this.state.spriteUrl}
                  className="card-img-top-rounded mx auto mt-2"
                />
              </div>
              <div className="col-md-9">
                {" "}
                {"Types: "}
                {this.state.types.map(type => (
                  <h5 key={type} className="badge badge-pill mr-1">
                    {type}
                  </h5>
                ))}
              </div>
              <div className="col-md-9">
                {" Next evolutions: "}
                {this.state.evolutions.map(evolution => (
                  <div key={evolution.id}>
                    <h5 className="badge badge-pill mr-1">{evolution.name}</h5>
                    <Link to={{ pathname: `./${evolution.id}` }}>
                      <img
                        src={evolution.sprite_front_url}
                        className="card-img-top-rounded mx auto mt-2"
                      />
                    </Link>
                  </div>
                ))}
              </div>
              <div>
                <Link
                  to={{
                    pathname: `../edit/${this.state.id}`,
                    state: { id: this.state.id }
                  }}
                >
                  <button className="btn btn-primary">Update</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={event => this.handleDelete(event)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
