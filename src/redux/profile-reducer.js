
const SAVE_PROFILE_DATA = 'SAVE_PROFILE_DATA';
const SAVE_PRICE_DATA = 'SAVE_PRICE_DATA';
const SAVE_UPDATED_GALLERY = 'SAVE_UPDATED_GALLERY';
const SAVE_PHOTO_GALLERY = 'SAVE_PHOTO_GALLERY';
const DELETE_MAIN_PHOTO = 'DELETE_MAIN_PHOTO';
const UPDATE_MAIN_PHOTO = 'UPDATE_MAIN_PHOTO';

let initialState = {
    posts: null,
    profile: {
        id: null,
        name: null,
        city: null,
        services: null,
        aboutMe: null,
        contacts: null},
    photo: null,
    // "https://img.freepik.com/free-photo/front-portrait-of-the-woman-with-beauty-face_186202-6146.jpg"
    pricing: null,
    portfolio: null,
    status: '',
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
                },

            }
        case SAVE_PHOTO_GALLERY:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    portfolio: [...state.profile.portfolio, action.photo]
                }
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
        default:
            return state;
    }
}

export const saveProfileData = (profile, services) => ({ type: SAVE_PROFILE_DATA, profile, services });
export const savePriceData = (price) => ({ type: SAVE_PRICE_DATA, price });
export const saveUpdatedGallery = (portfolio) => ({ type: SAVE_UPDATED_GALLERY, portfolio })
export const savePhotoGallery = (photo) => ({ type: SAVE_PHOTO_GALLERY, photo })
export const deleteMainPhoto = () => ({ type: DELETE_MAIN_PHOTO })
export const updateMainPhoto = (photo) => ({ type: UPDATE_MAIN_PHOTO, photo })
// export const getUserProfile = (userId) => async (dispatch) => {
//     let response = await usersAPI.getProfile(userId);
//     dispatch(setUserProfile(response.data));
// }
// export const getStatus = (userId) => async (dispatch) => {
//   let response = await  profileAPI.getStatus(userId);
//             dispatch(setStatus(response.data));
// }

// export const updateStatus = (status) => async (dispatch) => {
//  try { 
//     let response = await  profileAPI.updateStatus(status);
//     if (response.data.resultCode === 0) {
//         dispatch(setStatus(status));
//     }
// } catch(error) {
//     alert("Создайте поп-ап для ошибки");
// }

// }

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