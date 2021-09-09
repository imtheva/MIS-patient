import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./layouts/Main";
import "./assets/css/main.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./reducers";


const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,

  document.getElementById("root")
);
