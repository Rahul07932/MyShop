import {
  SET_PRODUCT_LIST,
  SET_PRODUCT_LIST_ERROR,
  SET_PRODUCT_LIST_LOADING,
} from "./constant";

// Initial state with loading and error
const initialState = {
  loading: true,
  data: [],
  error: null,
};

export const productData = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SET_PRODUCT_LIST:
      console.log("PRODUCT LIST Condition", action);
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case SET_PRODUCT_LIST_ERROR:
      console.log("PRODUCT LIST ERROR", action);
      return {
        ...state,
        loading: false,
        error: action.data,
      };

    default:
      return state;
  }
};
