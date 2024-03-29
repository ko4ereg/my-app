import { postsAPI  } from "../api/api";


const SET_POSTS = 'SET_POSTS';
const SET_PAGINATION_POSTS = 'SET_PAGINATION_POSTS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const ADD_LIKE = 'ADD_LIKE';
const ADD_COMMENT = 'ADD_COMMENT';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SORT_MY_POSTS = 'SORT_MY_POSTS';
const SORT_CATEGORY_POSTS = 'SORT_CATEGORY_POSTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_PAGINATOR = 'TOGGLE_IS_PAGINATOR';
const TOGGLE_IS_FETCHINGFORM = 'TOGGLE_IS_FETCHINGFORM';
const SET_POSTS_NULL = 'SET_POSTS_NULL';
const SET_CATEGORY = 'SET_CATEGORY';
const SET_TOTAL_POSTS_COUNT = 'SET_TOTAL_POSTS_COUNT';

let initialState = {
    posts: [

    ],
    categories: ['маникюр', 'педикюр', 'массаж', 'волосы'],
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFetchingPaginator: false,
    isFetchingForm: false,
    category: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.posts]

                // posts:  action.posts

                // users: state.users.concat(action.users)
            }
        case SET_PAGINATION_POSTS:
            return {
                ...state,
                posts: state.posts.concat(action.posts)
                // ...state,
                // users: state.users.concat(action.users)
            }
        case ADD_LIKE:
            const updatedPosts = state.posts.map(post => {
                if (post.id === action.postId) {
                    const likedByIndex = post.likedBy.indexOf(action.userId);
                    if (likedByIndex !== -1) {
                        const updatedLikedBy = post.likedBy.filter(userId => userId !== action.userId);
                        return {
                            ...post,
                            likes: post.likes - 1,
                            likedBy: updatedLikedBy
                        }
                    } else {
                        return {
                            ...post,
                            likes: post.likes + 1,
                            likedBy: [...post.likedBy, action.userId]
                        }
                    }
                } else {
                    return post;
                }
            });
            return {
                ...state,
                posts: updatedPosts
            };
        case ADD_COMMENT:
            const updatedComments = state.posts.map(post => {
                if (post.id === action.postId) {
                    const newComment = {
                        id: post.comments.length + 1,
                        authorId: action.userId,
                        author: action.authorName,
                        text: action.text,
                    }
                    return {
                        ...post,
                        comments: [...post.comments, newComment],
                    }

                } else {
                    return post;
                }
            })
            return {
                ...state,
                posts: updatedComments
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.newPost, ...state.posts]
            };
        case SORT_MY_POSTS:
            const myPosts = state.posts.filter(post => post.authorId === action.authorId);
            return {
                ...state,
                posts: myPosts
            };
        case SORT_CATEGORY_POSTS:
            const categoryPosts = state.posts.filter(post => post.authorService.includes(action.authorService));
            return {
                ...state,
                posts: categoryPosts
            };
        case DELETE_POST:
            const postsAfterDelete = state.posts.filter(post => post.id !== action.postId)
            return {
                ...state,
                posts: postsAfterDelete
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_CATEGORY:
            return {
                ...state,
                category: action.category
            }
        case SET_TOTAL_POSTS_COUNT:
            return {
                ...state,
                totalPostsCount: action.totalPostsCount
            }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_PAGINATOR:
            return { ...state, isFetchingPaginator: action.isFetching }
        case TOGGLE_IS_FETCHINGFORM:
            return { ...state, isFetchingForm: action.isFetching }
        case SET_POSTS_NULL:
            return { ...state, posts: [] }
        default:
            return state;
    }
}


export const addLike = (userId, postId) => ({ type: ADD_LIKE, userId, postId });
export const addComment = (userId, authorName, postId, text) => ({ type: ADD_COMMENT, userId, authorName, postId, text });
export const addPost = (newPost) => ({ type: ADD_POST, newPost });
export const deletePostState = (postId) => ({type: DELETE_POST, postId});

export const setPosts = (posts) => ({ type: SET_POSTS, posts });
export const setCategory = (category) => ({ type: SET_CATEGORY, category });
export const setPostsNull = () => ({ type: SET_POSTS_NULL });
export const setPaginationPosts = (posts) => ({ type: SET_PAGINATION_POSTS, posts })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalPostsCount = (totalPostsCount) => ({ type: SET_TOTAL_POSTS_COUNT, totalPostsCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleIsFetchingForm = (isFetching) => ({ type: TOGGLE_IS_FETCHINGFORM, isFetching });
export const toggleFetchingPaginator = (isFetching) => ({ type: TOGGLE_IS_PAGINATOR, isFetching });


//Это санк

export const createPost = (newPost, photoFile) => {
    return async dispatch => {
        dispatch(toggleIsFetchingForm(true));
        try {
            await postsAPI.createPost(newPost, photoFile).then((response) => {
                if (response) {
                    dispatch(setPostsNull());
                    dispatch(requestPosts());
                    dispatch(toggleIsFetchingForm(false));
                }
            });
            return true;
            }
            catch (error) {
                console.error(error);
            } 
    }
}

export const addLikeReq = (userId, postId) => {
    return async dispatch => {
        await postsAPI.addLike(userId, postId).then(() => {
            dispatch(addLike(userId, postId));
        })
    }
};
export const addCommentReq = (userId, userName, postId, value) => {
    return async dispatch => {
        dispatch(toggleIsFetchingForm(true));
        await postsAPI.addComment(userId, userName, postId, value).then(() => {
            dispatch(addComment(userId, userName, postId, value));
        })
        dispatch(toggleIsFetchingForm(false));
    }
};

export const requestPosts = (numberPage = 1, pageSize = 3, category = null, userId = null) => {
    return async dispatch => {
        dispatch(toggleIsFetching(true));
        try {
            let data = await postsAPI.getPosts(numberPage, pageSize, category, userId);
            dispatch(setPosts(data));
            console.log(data);
            await dispatch(requestPostsTotalCount(category, userId)).then(response => {
            dispatch(setTotalPostsCount(response));
            })
            return data;
        }
        catch (error) {
            console.error(error);
        } 
        finally {
            dispatch(toggleIsFetching(false));
        }
    }
}
export const requestPostsTotalCount = (category, userId) => {
    return async dispatch => {
        let data = await postsAPI.getPostsTotalCount(category, userId);
        return data.length;
    }

}

export const deletePost = (postId, deletedImageUrl) => {
    return async dispatch => {
        try {
        await postsAPI.deletePost(postId, deletedImageUrl).then((response) => {
            if (response) {
                dispatch(setPostsNull());
                dispatch(requestPosts());
            }
        });
        return true;
        }
        catch (error) {
            console.error(error);
        } 
    }
}
export const setPostNotShow = (postId, userId) => {
    return async dispatch => {
        try {
        await postsAPI.deletePost(postId, userId).then((response) => {
            if (response) {
                dispatch(setPostsNull());
                dispatch(requestPosts());
            }
        });
        return true;
        }
        catch (error) {
            console.error(error);
        } 
    }
}

export const getPostsWithPagination = (numberPage, pageSize, category = null, userId = null) => {
    return async dispatch => {
        dispatch(toggleFetchingPaginator(true));
        let data = await postsAPI.getPostsWithPagination(numberPage, pageSize, category, userId);
        dispatch(setPaginationPosts(data));
        dispatch(toggleFetchingPaginator(false));
        dispatch(setCurrentPage(numberPage));
        return data;
    }
}

export default postsReducer;


