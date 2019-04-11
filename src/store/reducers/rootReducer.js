import pokemonReducer from "./pokemonReducer";
import typesReducer from "./pokeTypesReducer";
import { combineReducers } from "redux";
import detailsReducer from "./detailsReducer";

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
  pokeTypes: typesReducer,
  details: detailsReducer
});

export default rootReducer;
