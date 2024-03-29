import { collection, getDocs, query, where } from "firebase/firestore";
import { authAPI, profileAPI } from "../api/api";
import { db } from "../firebase";
import { setAuthUserPhoto } from "./auth-reducer";

const SAVE_PROFILE_DATA = 'SAVE_PROFILE_DATA';
const SAVE_PRICE_DATA = 'SAVE_PRICE_DATA';
const SAVE_UPDATED_GALLERY = 'SAVE_UPDATED_GALLERY';
const SAVE_PHOTO_GALLERY = 'SAVE_PHOTO_GALLERY';
const DELETE_MAIN_PHOTO = 'DELETE_MAIN_PHOTO';
const UPDATE_MAIN_PHOTO = 'UPDATE_MAIN_PHOTO';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_IS_FETCHING_FORM = 'SET_IS_FETCHING_FORM:';

let initialState = {
    posts: null,
    profile: null,
    isFetching: false,
    isFetchingForm: false,

    // photo: null,
    // // "https://img.freepik.com/free-photo/front-portrait-of-the-woman-with-beauty-face_186202-6146.jpg"
    // pricing: null,

    // status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PROFILE_DATA:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.profile,
                    services: action.services,

                },

            }
        case SET_USER_PROFILE:
            
            return {
                ...state, profile: action.profile,
            }
        case SAVE_PRICE_DATA:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    pricing: action.price,
                },

            }
        case SAVE_UPDATED_GALLERY:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    portfolio: action.portfolio,
                    // portfolio: [...state.profile.portfolio, action.photo]
                },

            }
        case SAVE_PHOTO_GALLERY:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    portfolio: state.profile.portfolio.concat(action.photo)
                },

            }
        case DELETE_MAIN_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photo: null
                }
            }
        case UPDATE_MAIN_PHOTO:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photo: action.photo
                }
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_IS_FETCHING_FORM:
            return {
                ...state,
                isFetchingForm: action.isFetchingForm
            }
        default:
            return state;
    }
}

// export const saveProfileData = (profile, services) => ({ type: SAVE_PROFILE_DATA, profile, services });
// export const savePriceData = (price) => ({ type: SAVE_PRICE_DATA, price });
export const saveUpdatedGallery = (portfolio) => ({ type: SAVE_UPDATED_GALLERY, portfolio })
export const savePhotoGallery = (photo) => ({ type: SAVE_PHOTO_GALLERY, photo })
export const deleteMainPhotoSucces = () => ({ type: DELETE_MAIN_PHOTO })
export const updateMainPhoto = (photo) => ({ type: UPDATE_MAIN_PHOTO, photo })
export const isFetching = (isFetching) => ({ type: SET_IS_FETCHING, isFetching })
export const isFetchingForm = (isFetchingForm) => ({ type: SET_IS_FETCHING_FORM, isFetchingForm })
let userId;

const authenticateUser = async () => {
    let response = authAPI.authMe();
    if (response.currentUser) {
        const { currentUser } = response;
        const usersCollectionRef = collection(db, 'users');
        const q = query(usersCollectionRef, where('uid', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            userId = doc.data().id;
        });
    }
}

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const getUserProfile = (userId) => async (dispatch) => {
    dispatch(isFetching(true));
    let response = await profileAPI.getProfile(userId);
    dispatch(isFetching(false));
    return dispatch(setUserProfile(response));
  
}

export const saveProfile = (profile, services) => async (dispatch) => {
    dispatch(isFetchingForm(true));
    authenticateUser();
    try {
       profileAPI.saveProfile(profile, services).then(() => {
        dispatch(getUserProfile(userId)).then(()=> {
            dispatch(isFetchingForm(false));
        })
      
        })
    }
    
    catch {
        console.log('Не получилось');
    }
    

}

export const savePricelistData = (updatedPricelist) => async (dispatch) => {
    dispatch(isFetchingForm(true));
    authenticateUser();
    try {
        await profileAPI.savePricelist(updatedPricelist).then(() => {
            dispatch(getUserProfile(userId)).then(()=> {
                dispatch(isFetchingForm(false));
            })
          
            })
    }
    catch {
        console.log('Не получилось');
    }

}

export const saveMainPhoto = (file, userId) => async (dispatch) => {
    try {
        dispatch(isFetching(true));
        let response = await profileAPI.saveUserPhoto(file, userId);
        dispatch(updateMainPhoto(response))
        dispatch(setAuthUserPhoto(response));
        dispatch(isFetching(false));
    }
    catch {
        console.log('Не получилось');
    }

}

export const deleteMainPhoto = (file) => async (dispatch) => {
    try {
        dispatch(isFetching(true));
        await profileAPI.deletePhoto();
        dispatch(deleteMainPhotoSucces())
        dispatch(setAuthUserPhoto(null));
        dispatch(isFetching(false));

    }
    catch {
        console.log('Не получилось');
    }

}

export const savePortfolioPhoto = (file, userId) => async (dispatch) => {
    try {
        dispatch(isFetching(true));
        let response = await profileAPI.saveUserPortfolioPhoto(file, userId);
        dispatch(savePhotoGallery(response)) ;
        dispatch(isFetching(false));
        
      

    }
    catch {
        console.log('Не получилось');
    }

}

export const updatePortfolioPhoto = (file, userId, deletedImageUrl) => async (dispatch) => {
    try {
        dispatch(isFetching(true));
        let response = await profileAPI.updateUserPortfolioPhoto(file, userId);
        await profileAPI.deletePortfolioPhoto(deletedImageUrl);
        dispatch(saveUpdatedGallery(file));
        dispatch(isFetching(false));
    }
    catch {
        console.log('Не получилось');
    }

}
export const deletePortfolioPhoto = (file, userId) => async (dispatch) => {
    try {
        dispatch(isFetching(true));
        let response = await profileAPI.deletePortfolioPhoto(userId);
        dispatch(isFetching(false));
        //    dispatch(saveUpdatedGallery(response));

    }
    catch {
        console.log('Не получилось');
    }

}







// export const savePhoto = (file) => async (dispatch) => {
//     let response = await  profileAPI.savePhoto(file);
//               if (response.data.resultCode === 0) {
//                   dispatch(savePhotoSucces(response.data.data.photos));
//               }
//   }

// export const saveProfile = (profile) => async (dispatch, getState) => {
//     const userId = getState().auth.userId;
//     let response = await  profileAPI.saveProfile(profile);
//               if (response.data.resultCode === 0) {
//                 dispatch(getUserProfile(userId))  
//               } else {
//         dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
//         return Promise.reject( response.data.messages[0] );          
//     }
//   }

export default profileReducer;


// let initialState = {
//     posts: [
//         { id: 2, message: "I'm not gay!", likescount: 100 },
//         { id: 1, message: "Hello!", likescount: 0 },
//     ],
// profile: {
//     id: 1,
//     name: "Валентина Рубцова",
//     city: "Екатеринбург",
//     services: ["Педикюр", "Массаж"],
//     aboutMe: "Люблю ноготочки только на ногах, это мое все",
//     contacts: {
//         instagram: "instagram.com",
//         whatsapp: "+79850",
//         telegram: "@ass",
//         tiktok: "tiktok.com",
//         vk: "vk.com"

//     },

//         photo: "https://img.freepik.com/free-photo/front-portrait-of-the-woman-with-beauty-face_186202-6146.jpg",
//         // "https://img.freepik.com/free-photo/front-portrait-of-the-woman-with-beauty-face_186202-6146.jpg"
//         pricing: [
//             { id: 1, title: 'Педикюр', price: 1000, },
//             { id: 2, title: 'Педикюр мужчинам', price: 2000, },
//             { id: 3, title: 'Массаж ног', price: 3000, },

//         ],
//         portfolio: [
//             'https://sunlight.net/wiki/wp-content/uploads/2022/08/Manikyur-dlya-ofisa-27.jpg',
//             'https://sunlight.net/wiki/wp-content/uploads/2022/08/Manikyur-dlya-ofisa-26.jpg',
//             'https://sunlight.net/wiki/wp-content/uploads/2022/08/Manikyur-dlya-ofisa-25.jpg',
//             'https://sunlight.net/wiki/wp-content/uploads/2022/08/Manikyur-dlya-ofisa-24.jpg',
//         ]
//     },
//     status: '',

// };