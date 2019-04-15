import axios from "axios";
import BASE_URL_V1 from "../../api/consts";

export const fetchPokemons = () => dispatch => {
  console.log("fetching");
  axios
    .get(`${BASE_URL_V1}/pokemons`)
    .then(pokemons =>
      dispatch({
        type: "FETCH_POKEMONS",
        payload: pokemons.data
      })
    )
    .catch(err =>
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err.message || "Something wrong happened."
      })
    );
};

export const fetchPokemonById = id => dispatch => {
  axios
    .get(`${BASE_URL_V1}/pokemons/${id}`)
    .then(pokemon =>
      dispatch({
        type: "FETCH_POKEMON_BY_ID",
        payload: pokemon.data
      })
    )
    .catch(err =>
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err.message || "Something wrong happened."
      })
    );
};

export const createPokemon = pokemonData => dispatch => {
  axios
    .post(`${BASE_URL_V1}/pokemons`, pokemonData)
    .then(
      pokemon => (
        dispatch(fetchPokemons()),
        dispatch({
          type: "CREATE_POKEMON",
          payload: pokemon.data
        }),
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: true
        }),
        dispatch({
          type: "CLEAR_SUCCESS",
          payload: false
        })
      )
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
    .then(
      pokemon => (
        dispatch({
          type: "UPDATE_POKEMON",
          payload: pokemon.data
        }),
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: true
        }),
        dispatch({
          type: "CLEAR_SUCCESS",
          payload: false
        }),
        dispatch(fetchPokemons())
      )
    )
    .catch(err =>
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err.message || "Something wrong happened."
      })
    );
};

export const deletePokemon = id => dispatch => {
  axios
    .delete(`${BASE_URL_V1}/pokemons/${id}`)
    .then(
      () => (
        dispatch(fetchPokemons()),
        dispatch({
          type: "REQUEST_SUCCESS",
          payload: true
        }),
        dispatch({
          type: "DELETE_POKEMON",
          payload: null
        })
      )
    )
    .catch(err =>
      dispatch({
        type: "REQUEST_FAILURE",
        payload: err.message || "Something wrong happened."
      })
    );
};
