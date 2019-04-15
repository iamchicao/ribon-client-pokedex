import BASE_URL_V1 from "../../api/consts";

export const fetchPokeTypes = () => dispatch => {
  fetch(`${BASE_URL_V1}/types`)
    .then(res => res.json())
    .then(types =>
      dispatch({
        type: "FETCH_POKETYPES",
        payload: types
      })
    );
};

export default fetchPokeTypes;
