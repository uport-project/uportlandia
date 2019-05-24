import { createStore, applyMiddleware } from "redux";

export default function configureStore(reducer, sagaMiddleware) {
  return createStore(reducer, applyMiddleware(sagaMiddleware));
}
