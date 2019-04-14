import pokemonReducer from "./pokemonReducer";
import typesReducer from "./pokeTypesReducer";
import detailsReducer from "./detailsReducer";
import responseHandlerReducer from "./responseHandlerReducer";
import { combineReducers } from "redux";



const rootReducer = combineReducers({
  pokemons: pokemonReducer,
  pokeTypes: typesReducer,
  details: detailsReducer,
  responseHandler: responseHandlerReducer
});

export default rootReducer;
