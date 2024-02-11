import { combineReducers, configureStore,   } from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
 
 
 

let reducers = combineReducers({
    profilePage : profileReducer,
    auth : authReducer,
    
});

export let store = configureStore({
reducer: reducers 
}
)

export default store;