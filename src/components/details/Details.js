import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deletePokemon,
  fetchPokemonById
} from "../../store/actions/pokemonActions";

class Details extends Component {
  componentDidMount() {
    this.props.fetchPokemonById(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    const idPrev = prevProps.match.params.id;
    const idAct = this.props.match.params.id;

    if (idPrev !== idAct) {
      this.props.fetchPokemonById(this.props.match.params.id);
    }
  }

  flattenEvolutions(evolutions) {
    let result = [];
    evolutions.forEach(evolution => {
      result.push(evolution);
      if (evolution.evolutions.length > 0) {
        result.push(this.flattenEvolutions(evolution.evolutions));
      }
    });
    return result.flat();
  }

  handleDelete = async () => {
    console.log(this.props.match.params.id);
    this.props.deletePokemon(this.props.match.params.id);
    this.props.history.push("/");
  };

  render() {
    const { name, types, sprite_front_url, evolutions } = this.props.pokemon;
    const flattenEvolutions = this.flattenEvolutions(evolutions);
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{name}</h5>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row allign-items-center">
              <div className="col-md-3">
                <img
                  src={sprite_front_url}
                  className="card-img-top-rounded mx auto mt-2"
                />
              </div>
              <div className="col-md-9">
                {" "}
                {"Types: "}
                {types.map(type => (
                  <h5 key={type.name} className="badge badge-pill mr-1">
                    {type.name}
                  </h5>
                ))}
              </div>
              <div className="col-md-9">
                {" Next evolutions: "}
                {flattenEvolutions.map(evolution => (
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
                    pathname: `../edit/${this.props.match.params.id}`
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

const mapStateToProps = (state, ownProps) => {
  return {
    pokemon: state.details
  };
};

export default connect(
  mapStateToProps,
  { fetchPokemonById, deletePokemon }
)(Details);
