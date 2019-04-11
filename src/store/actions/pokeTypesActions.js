export const fetchTypes = () => dispatch => {
  fetch("http://127.0.0.1:3000/api/v1/types")
    .then(res => res.json())
    .then(types =>
      dispatch({
        type: "FETCH_TYPES",
        payload: types
      })
    );
};