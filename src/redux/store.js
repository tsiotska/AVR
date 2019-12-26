import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer from "./reducer";

const  store = createStore(combineReducers({reducer}/*, applyMiddleware(sagas)*/));

export default store;
