import {combineReducers} from "redux";
import authReducer from "./auth";
import regReducer from "./reg";

export default combineReducers({
    auth: authReducer,
    reg: regReducer,
})