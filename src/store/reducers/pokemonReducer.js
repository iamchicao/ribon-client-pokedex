const initialState = {
  items: [],
  searched: ""
};

const pokemonReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case "FETCH_POKEMONS":
      return {
        ...state,
        items: action.payload
      };
    case "FETCH_POKEMON_BY_ID":
      return {
        ...state,
        item: action.payload
      };
    case "DELETE_POKEMON":
      return {
        ...state
      };
    default:
      return state;
  }
};

export default pokemonReducer;
