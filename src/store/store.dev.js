import { createStore, applyMiddleware, compose } from "redux";

export default function configureStore(reducer, sagaMiddleware) {
    const store = createStore(reducer, {}, compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ));
    return store;
}
