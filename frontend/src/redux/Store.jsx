/* eslint-disable no-unused-vars */
import { applyMiddleware, combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer/UserReducer";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";

const reducers = combineReducers({
  user: userReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const Persistor = persistStore(Store);
