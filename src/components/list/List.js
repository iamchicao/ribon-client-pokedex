import React, { Component } from "react";
import Card from "../card/Card";
import axios from "axios";

export default class List extends Component {
  state = {
    url: "http://127.0.0.1:3000/api/v1/pokemons",
    pokemon: null,
    search: ""
  };

  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data });
  }

  render() {
    return (
      <>
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
      </>
    );
  }
}
