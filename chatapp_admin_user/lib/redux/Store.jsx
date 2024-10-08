/* eslint-disable no-unused-vars */
import { applyMiddleware, combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/UserReducer";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const reducers = combineReducers({
  user: userReducer,
});

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storageType = typeof window !== 'undefined' ? storage : createNoopStorage();

const persistConfig = {
  key: "root",
  storage: storageType,
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
