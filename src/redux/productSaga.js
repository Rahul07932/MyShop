import { takeEvery, put } from "redux-saga/effects";
import { PRODUCT_LIST, SET_PRODUCT_LIST, SET_PRODUCT_LIST_ERROR } from "./constant";

function* getProducts() {
  try {
    // Fetch product data from API
    let response = yield fetch("http://localhost:3500/products");
    let data = yield response.json();

    // Filter products where the name matches 'Oppo A7'


    // Dispatch filtered data to the reducer
    yield put({ type: SET_PRODUCT_LIST, data: data });
  } catch (error) {
    // Handle error and dispatch error action
    yield put({ type: SET_PRODUCT_LIST_ERROR, data: error });
    console.error("Failed to fetch products:", error);
  }
}

function* productSaga() {
  yield takeEvery(PRODUCT_LIST, getProducts);
}

export default productSaga;


