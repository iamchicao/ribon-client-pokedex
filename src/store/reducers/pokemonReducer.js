const initialState = {
  items: [],
  item: [],
  searched: "",
  errors: null,
  success: false
};

const pokemonReducer = (state = initialState, action) => {
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
    case "CREATE_POKEMON":
      return {
        ...state,
        item: action.payload,
        success: true
      };
    case "UPDATE_POKEMON":
      return {
        ...state,
        item: action.payload,
        success: true
      };
    default:
      return state;
  }
};

export default pokemonReducer;
