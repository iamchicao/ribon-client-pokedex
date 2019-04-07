import React, { Component } from "react";
import Card from "../card/Card";
import axios from "axios";

export default class List extends Component {
  state = {
    url: "http://127.0.0.1:3000/api/v1/pokemons",
    pokemon: null
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    console.log(res.data[0]);

    this.setState({ pokemon: res.data });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.pokemon ? (
          <div className="row">
            {this.state.pokemon.map(pokemon => (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                spriteUrl={pokemon.sprite_front_url}
              />
            ))}
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </React.Fragment>
    );
  }
}
