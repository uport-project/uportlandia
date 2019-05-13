import { createStore, applyMiddleware } from "redux";

export default function configureStore(reducer, sagaMiddleware, routerMiddleware) {
  return createStore(reducer, applyMiddleware(routerMiddleware, sagaMiddleware));
}
