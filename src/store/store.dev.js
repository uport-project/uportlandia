import { createStore, applyMiddleware, compose } from "redux";

export default function configureStore(reducer, sagaMiddleware, routerMiddleware) {
  const store = createStore(reducer, {}, compose(
    applyMiddleware(routerMiddleware, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));
  return store;
}
