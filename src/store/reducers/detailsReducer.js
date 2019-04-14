const initialState = {
  name: "",
  sprite_front_url: "",
  types: [],
  evolutions: [],
  evolves_from: ""
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_POKEMON_BY_ID":
      return {
        ...state,
        name: action.payload.name,
        types: action.payload.types,
        evolves_from: action.payload.evolves_from,
        sprite_front_url: action.payload.sprite_front_url,
        evolutions: action.payload.evolutions
      };
    default:
      return state;
  }
};

export default detailsReducer;
