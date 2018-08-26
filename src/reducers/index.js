import { combineReducers } from "redux";
import loading from "./loading";
import asyncStateStorage from "./asyncstatestorage";

export default combineReducers({
    loading,
    asyncStateStorage
});
