import { combineReducers, configureStore,   } from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
 
 
 

let reducers = combineReducers({
    profilePage : profileReducer,
    auth : authReducer,
    app: appReducer,
});

export let store = configureStore({
reducer: reducers 
}
)

export default store;