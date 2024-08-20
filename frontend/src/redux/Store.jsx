/* eslint-disable no-unused-vars */
import { applyMiddleware, combineReducers } from "redux";
import userReducer from "./userReducer/UserReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
  user: userReducer,
});

const Store = configureStore({reducer: reducers}, applyMiddleware(thunk));

export default Store;