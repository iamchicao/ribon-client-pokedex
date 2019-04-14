import axios from "axios";
import BASE_URL_V1 from "../../api/consts";

export const fetchPokemons = () => dispatch => {
  axios.get(`${BASE_URL_V1}/pokemons`).then(pokemons =>
    dispatch({
      type: "FETCH_POKEMONS",
      payload: pokemons.data
    })
  );
};

export const fetchPokemonById = id => dispatch => {
  axios.get(`${BASE_URL_V1}/pokemons/${id}`).then(pokemon =>
    dispatch({
      type: "FETCH_POKEMON_BY_ID",
      payload: pokemon.data
    })
  );
};

export const createPokemon = pokemonData => dispatch => {
  axios
    .post(`${BASE_URL_V1}/pokemons`, pokemonData)
    .then(pokemon =>
      dispatch({
        type: "REQUEST_SUCCESS",
        payload: pokemon
      })
    )
    .catch(err =>
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err.message || "Something wrong happened."
      })
    );
};

export const updatePokemon = (id, pokemonData) => dispatch => {
  axios
    .put(`${BASE_URL_V1}/pokemons/${id}`, pokemonData)
    .then(pokemon =>
      dispatch({
        type: "REQUEST_SUCCESS",
        payload: pokemon
      })
    )
    .catch(err =>
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err.message || "Something wrong happened."
      })
    );
};

export const deletePokemon = id => dispatch => {
  axios.delete(`${BASE_URL_V1}/pokemons/${id}`).then(pokemon => {
    dispatch(fetchPokemons());
    dispatch({
      type: "DELETE_POKEMON",
      payload: pokemon
    });
  });
};
