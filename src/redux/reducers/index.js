import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";

const rootReducer = combineReducers({
  products: productReducer,
});

export default rootReducer;
