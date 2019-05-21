import { init as sentryInit } from "@sentry/browser";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";

import configureStore from "./store"; // eslint-disable-line import/default
import history from "./utils/history";
import createRootReducer from "./reducers";
import sagas from "./sagas";
import Routes from "./routes";
import { SENTRY_DSN } from "./constants/config";
import "./i18n";

import "./css/index.css"

sentryInit({ dsn: SENTRY_DSN });

const sagaMiddleware = createMiddleware();
const rootReducer = createRootReducer(history);
const store = configureStore(rootReducer, sagaMiddleware, routerMiddleware(history));
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
