import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, SET_SEARCH_TERM } from './constant';

// Cart data reducer to manage cart items
export const cartdata = (data = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Add item to cart
      return [action.data, ...data];

    case REMOVE_FROM_CART:
      // Remove item by matching id
      return data.filter((item) => item.id !== action.data);

    case UPDATE_QUANTITY:
      // Update item quantity
      return data.map((item) =>
        item.id === action.payload.itemId
          ?{ ...item, quantity: item.quantity + action.payload.increment }
          : item
      );
  
    default:
      return data;
  }
};





