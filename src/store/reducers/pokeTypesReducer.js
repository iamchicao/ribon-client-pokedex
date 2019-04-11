const initialState = {
  items: []
};

const pokeTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TYPES":
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export default pokeTypesReducer;
