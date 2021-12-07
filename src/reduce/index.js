import {createStore,combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import tokenReducer from "./login";
// import tasks from "./tasks";

const reducers=combineReducers({tokenReducer});

const store=()=>{
    return createStore(reducers,composeWithDevTools());
};
export default store();