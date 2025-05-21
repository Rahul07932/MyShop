import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { productData } from "./ProductReducer";
import { cartdata } from "./reducer"; 

import createSagaMiddleware from "redux-saga";
import productSaga from "./productSaga";

const rootReducer = combineReducers({
  cartdata,
  productData,
   })

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);

export default store;
