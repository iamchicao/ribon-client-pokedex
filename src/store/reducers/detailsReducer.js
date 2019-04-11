const initialState = {
  name: "",
  sprite_front_url: "",
  types: [],
  evolutions: []
};

const detailsReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case "FETCH_POKEMON_BY_ID":
      console.log(action.payload);
      return {
        ...state,
        name: action.payload.name,
        types: action.payload.types,
        sprite_front_url: action.payload.sprite_front_url,
        evolutions: action.payload.evolutions
      };
    default:
      return state;
  }
};

export default detailsReducer;
