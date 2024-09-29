import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { Persistor, Store } from "./redux/Store";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <PersistGate persistor={Persistor}>
    <Provider store={Store}>
      <App />
    </Provider>
  </PersistGate>
);

reportWebVitals();
