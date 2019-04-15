export const clearErrors = () => dispatch => {
  dispatch({
    type: "CLEAR_ERROR",
  });
};

export const requestSuccess = () => dispatch => {
  dispatch({
    type: "REQUEST_SUCCESS",
  });
};

export const requestFailure = (errors) => dispatch => {
  dispatch({
    type: "REQUEST_FAILURE",
  });
};

export const clearSuccess = () => dispatch => {
  dispatch({
    type: "CLEAR_SUCCESS",
  });
};
