import { combineReducers } from "redux";
import { cartdata } from "./reducer";
import { productData } from "./ProductReducer";
export default combineReducers(cartdata,productData)