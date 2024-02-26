// import { authAPI, securityAPI } from "../api/api";

import { collection, getDocs, query, where } from "firebase/firestore";
import { authAPI } from "../api/api";
import { db } from "../firebase";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';

const LOGOUT_SUCCES = 'LOGOUT_SUCCES';


let initialState = {
    userId: null,
    email: null,
    name: null,
    isAuth: false,
    userPhoto: null,
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
                userPhoto : action.photo,
            }
        case LOGOUT_SUCCES:
            return {
                ...state,
                userId: null,
                email: null,
                name: null,
                isAuth: false,
                userPhoto: null
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, name, isAuth, userPhoto) => ({ type: SET_USER_DATA, payload: { userId, email, name, isAuth, userPhoto } });
export const logoutSucces = () => ({ type: LOGOUT_SUCCES })
export const setAuthUserPhoto = (photo) => ({type : SET_USER_PHOTO, photo })


export const getAuthUserData = () => {
    return async (dispatch) => {
        let response = await authAPI.authMe();
        if (response.currentUser) {
            const { currentUser } = response;
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("uid", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const id = doc.data().id;
                const userPhoto = doc.data().photo;
                dispatch(setAuthUserData(id, currentUser.email, currentUser.displayName, true, userPhoto));
            });

        }
    }
}


export const login = (email, password) => {
    return async (dispatch) => {
        const userCredential = await authAPI.login(email, password);
        dispatch(getAuthUserData());
    }
}


export const registrate = (email, password) => {
    return async (dispatch) => {
        const userCredential = await authAPI.registrate(email, password);
        dispatch(getAuthUserData());
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

// export const handleLogin = (email, password) => {
//     return (dispatch) => {
//       authAPI.login(email, password)
//         .then(user => {
//           console.log(user);
//           dispatch(setAuthUserData(user));
//         });
//     }
//   }

// export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });
// export const setAuthUserPhoto = (userPhoto) => ({ type: SET_USER_PHOTO, data: { userPhoto } });
// export const getCaptchaUrlSucces = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCES, payload: { captchaUrl } });

// //thunk
// export const getAuthUserInfo = () => async (dispatch) => {
//     let response = await authAPI.authMe();
//     if (response.data.resultCode === 0) {
//         let { id, email, login } = response.data.data;
//         dispatch(setAuthUserData(id, email, login, true));
//         authAPI.getAuthPhoto(id).then(response => {
//             dispatch(setAuthUserPhoto(response.data.photos.small));
//         })
//     }
// }


// export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
//     let response = await authAPI.login(email, password, rememberMe, captcha);
//     if (response.data.resultCode === 0) {
//         dispatch(getAuthUserInfo());
//     } else {
//         if (response.data.resultCode === 10) {
//             dispatch(getCaptchaUrl());
//         }
//         let message = response.data.messages.length > 0 ? response.data.messages[0] : 'error!';
//         dispatch(stopSubmit('login', { _error: message }));
//     }
// }
// export const getCaptchaUrl = () => async (dispatch) => {
//     let response = await securityAPI.getCaptcha();
//     const captchaUrl = response.data.url;
//     dispatch(getCaptchaUrlSucces(captchaUrl));
// }



// export const logout = () => async (dispatch) => {
//     let response = await authAPI.logout();
//     if (response.data.resultCode === 0) {
//         dispatch(setAuthUserData(null, null, null, false));
//     }
// }

export default authReducer;