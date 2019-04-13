const initialState = {
  items: [],
  searched: "",
  errors: null,
  success: false
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
    case "CREATE_POKEMON":
      return {
        ...state,
        item: action.payload,
        success: true
      };
    case "REQUEST_FAILURE":
      return {
        ...state,
        errors: action.payload
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
};

export default pokemonReducer;
