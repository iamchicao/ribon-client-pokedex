export const fetchPokemons = () => dispatch => {
  fetch("http://127.0.0.1:3000/api/v1/pokemons")
    .then(res => res.json())
    .then(pokemons =>
      dispatch({
        type: "FETCH_POKEMONS",
        payload: pokemons
      })
    );
};

export const fetchPokemonById = (id) => dispatch => {
  fetch(`http://127.0.0.1:3000/api/v1/pokemons/${id}`)
    .then(res => res.json())
    .then(pokemon =>
      dispatch({
        type: "FETCH_POKEMON_BY_ID",
        payload: pokemon
      })
    );
};

export const createPokemon = pokemonData => {
  return (dispatch, getState) => {
    //async call
    dispatch({
      type: "CREATE_POKEMON",
      pokemonData
    });
  };
};

export const searchPokemon = term => {
  console.log("searched");
  console.log("term " + term);
  return (dispatch, getState) => {
    dispatch({
      type: "SEARCH_POKEMON",
      term
    });
  };
};

export const deletePokemon = (id) => dispatch => {
  fetch(`http://127.0.0.1:3000/api/v1/pokemons/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(pokemon =>
      dispatch({
        type: "DELETE_POKEMON",
        payload: pokemon
      })
    );
};
