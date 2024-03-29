import { combineReducers, configureStore,   } from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import MastersReducer from "./masters-reducer";
import postsReducer from "./posts-reducer";
 
 
 

let reducers = combineReducers({
    profilePage : profileReducer,
    auth : authReducer,
    app: appReducer,
    masters: MastersReducer,
    posts: postsReducer
});

export let store = configureStore({
reducer: reducers 
}
)

export default store;