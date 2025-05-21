import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  SET_SEARCH_TERM,
} from "./constant";

// Cart Actions
export const addToCart = (data) => ({
  type: ADD_TO_CART,
  data,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  data: id,
});

export const updateQuantity = (itemId, increment) => ({
  type: UPDATE_QUANTITY,
  payload: { itemId, increment },
});

// Search Action
export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term,
});
