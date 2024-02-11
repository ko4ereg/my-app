// import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_PHOTO = 'SET_USER_PHOTO';
const GET_CAPTCHA_URL_SUCCES = 'GET_CAPTCHA_URL_SUCCES';
const SET_ISAUTH_TRUE = 'SET_ISAUTH_TRUE';
const SET_ISAUTH_FALSE = 'case SET_ISAUTH_FALSE';


let initialState = {
    userid: null,
    email: null,
    login: null,
    isAuth: true,
    userPhoto: null,
    captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCES:
            return {
                ...state,
                ...action.payload,


            }
        case SET_USER_PHOTO:
            return {
                ...state,
                ...action.userPhoto,
                ...action.userId,
            }
        case SET_ISAUTH_FALSE:
            return{
                ...state,
                isAuth: false
            }    
        case SET_ISAUTH_TRUE:
                return{
                    ...state,
                    isAuth: true
                }      

        default:
            return state;
    }
}


export const logout = () => ({type: SET_ISAUTH_FALSE}) 
export const login = () => ({type: SET_ISAUTH_TRUE}) 

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