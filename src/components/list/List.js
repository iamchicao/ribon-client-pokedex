import React from "react";
import Card from "../card/Card";

export default function List(props) {
  let pokemonCards = props.pokemons.map(pokemon => (
    <Card
      key={pokemon.name}
      id={pokemon.id}
      name={pokemon.name}
      spriteUrl={pokemon.sprite_front_url}
    />
  ));
  return <div className="row">{pokemonCards}</div>;
}
