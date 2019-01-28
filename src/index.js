import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createMiddleware from "redux-saga";

import configureStore from "./store"; // eslint-disable-line import/default
import reducer from "./reducers";
import sagas from "./sagas";
import Routes from "./routes";

import "./css/index.css"

const sagaMiddleware = createMiddleware();
const store = configureStore(reducer, sagaMiddleware);
sagaMiddleware.run(sagas);

const render = Component => ReactDOM.render(<Provider store={store}>
  <Component />
</Provider>, document.getElementById("root"));

render(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default;
    render(NextApp);
  });
}
