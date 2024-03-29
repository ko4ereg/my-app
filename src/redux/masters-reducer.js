import { usersAPI } from "../api/api";
//import { updateObjectInArray } from "../utils/helpers/object-helper";

const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_PAGINATOR = 'TOGGLE_IS_PAGINATOR';
const SET_USERS_NULL = 'SET_USERS_NULL';
const SET_SEARCHED_USERS = "SET_SEARCHED_USERS";
const SET_SEARCHED_USERS_NULL = 'SET_SEARCHED_USERS_NULL';

let initialState = {
    users: [
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    searchResults: [],
    isFetchingPaginator: false,
};

const MastersReducer = (state = initialState, action) => {
    switch (action.type) {
       
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
                // ...state,
                // users: state.users.concat(action.users)
            }
        case SET_SEARCHED_USERS:
            return {
                ...state,
                searchResults: action.users
                // ...state,
                // users: state.users.concat(action.users)
            }
        case SET_USERS_NULL:
            return {
                // ...state,
                // users: action.users
                ...state,
                users: [
                ], 
                currentPage: 1,
            }
        case SET_SEARCHED_USERS_NULL:
            return {
                // ...state,
                // users: action.users
                ...state,
                searchResults: [
                ], 
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_PAGINATOR:
            return { ...state, isFetchingPaginator: action.isFetching }

        default:
            return state;
    }
}



export const setUsers = (users) => ({ type: SET_USERS, users });
export const setUsersNull = () => ({ type: SET_USERS_NULL });
export const setSearchedUsers = (users) => ({type: SET_SEARCHED_USERS, users})
export const setSearchedUsersNull = () => ({type: SET_SEARCHED_USERS_NULL})

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const toggleFetchingPaginator = (isFetching) => ({ type: TOGGLE_IS_PAGINATOR, isFetching});


//Это санк
export const requestUsers = (numberPage, pageSize) => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(numberPage, pageSize);
        dispatch(setUsers(data));
        dispatch(toggleIsFetching(false));
        dispatch(setTotalUsersCount(data.length));
        return data;
    }
}
export const requestUsersTotalCount = () => {
    return async dispatch => {
        let data = await usersAPI.getUsersTotalCount();
        dispatch(setTotalUsersCount(data.length));
    }

}

export const getUsersWithPagination = (numberPage, pageSize) => {
    return async dispatch => {
         dispatch(toggleFetchingPaginator(true));
        let data = await usersAPI.getUsersWithPagination(numberPage, pageSize);
        dispatch(setUsers(data));
        dispatch(toggleFetchingPaginator(false));
        dispatch(setCurrentPage(numberPage));
        return data;
    }
}

export const sendQuerySearch = (querySearch) => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getQuerySearchUsers(querySearch);
        dispatch(toggleIsFetching(false));
        return data;
    }
  
}


 


export default MastersReducer;


 