import { collection, getDocs, query, where } from "firebase/firestore";
import { authAPI } from "../api/api";
import { db } from "../firebase";
import { isFetchingForm } from "./profile-reducer";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const LOGOUT_SUCCES = 'LOGOUT_SUCCES';


let initialState = {
    userId: null,
    email: null,
    name: null,
    isAuth: false,
    userPhoto: null,
    services: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.photo,
            }
        case LOGOUT_SUCCES:
            return {
                ...state,
                userId: null,
                email: null,
                name: null,
                isAuth: false,
                userPhoto: null,
                services: null,
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, name, isAuth, userPhoto, services) => ({ type: SET_USER_DATA, payload: { userId, email, name, isAuth, userPhoto, services } });
export const logoutSucces = () => ({ type: LOGOUT_SUCCES })
export const setAuthUserPhoto = (photo) => ({ type: SET_USER_PHOTO, photo })


export const getAuthUserData = () => {
    return async (dispatch) => {
       let response = authAPI.authMe();
        if (response.currentUser) {
            const { currentUser } = response;
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("uid", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                    const id = doc.data().id;
                    const userPhoto = doc.data().photo;
                    dispatch(setAuthUserData(id, currentUser.email, doc.data().name, true, userPhoto, doc.data().services  ));
                });
        }
    }
}


export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(isFetchingForm(true));
        try {
        await authAPI.login(email, password);
        dispatch(getAuthUserData());
        dispatch(isFetchingForm(false));
    }
       catch (error) {
        throw error}
       finally {dispatch(isFetchingForm(false));} 
    }
}


export const registrate = (email, password) => {
    return async (dispatch) => {
        dispatch(isFetchingForm(true));
        try {
            const userCredential = await authAPI.registrate(email, password);
            if (userCredential) {
               dispatch(getAuthUserData());
            }
        }
           catch (error) {
            throw error}
           finally {dispatch(isFetchingForm(false));} 
        }
    }
 
    export const resetPassword = (email) => {
        return async (dispatch) => {
            dispatch(isFetchingForm(true));
            try {
                await authAPI.resetPassword(email);
                alert("Письмо для восстановления отправлено!");
            }
               catch (error) {
                throw error}
               finally {dispatch(isFetchingForm(false));} 
            }
     
        }
    

export const logout = () => {
    return async dispatch => {
        try {
            await authAPI.logout();
            dispatch(logoutSucces())
        } catch (error) {
            console.log(error);
        }
    }
}
 
export default authReducer;