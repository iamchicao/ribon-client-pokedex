export const clearErrors = () => dispatch => {
  dispatch({
    type: "CLEAR_ERROR",
    payload: null
  });
};

export const requestSuccess = (payload) => dispatch => {
  dispatch({
    type: "REQUEST_SUCCESS",
    payload: payload
  });
};

export const requestFailure = (errors) => dispatch => {
  dispatch({
    type: "REQUEST_FAILURE",
    payload: errors
  });
};

export const clearSuccess = () => dispatch => {
  dispatch({
    type: "CLEAR_SUCCESS",
    payload: false
  });
};
