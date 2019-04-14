const initialState = {
  errors: null,
  success: false,
  payload: null
};

const responseHandler = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_FAILURE":
      return {
        errors: action.payload,
        success: false,
        payload: null
      };
    case "REQUEST_SUCCESS":
      return {
        errors: null,
        success: true,
        payload: action.payload
      };
    case "CLEAR_ERROR":
      return {
        errors: null,
        success: false,
        payload: null
      };
    case "CLEAR_SUCCESS":
      return {
        errors: null,
        success: false,
        payload: null
      };
    default:
      return state;
  }
};

export default responseHandler;
