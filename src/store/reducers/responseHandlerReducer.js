const initialState = {
  errors: null,
  success: false
};

const responseHandler = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case "REQUEST_FAILURE":
      return {
        errors: action.payload,
        success: false
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
        success: false
      };
    case "CLEAR_SUCCESS":
      return {
        errors: null,
        success: false
      };
    default:
      return state;
  }
};

export default responseHandler;
