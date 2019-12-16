import { createStore, combineReducers } from "redux";
import reducer from "./reducer";

const  store = createStore(combineReducers({reducer}));

export default store;
