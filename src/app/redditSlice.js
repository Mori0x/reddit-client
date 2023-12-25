import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getPostComments, getSubredditPosts } from "../api/reddit";


const initialState = {
    posts: [],
    error: false,
    loading: false,
    searchTerm: '',
    selectedSubReddit: '/r/pics/'
}

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
        },

        setPosts(state, action) {
            state.posts = action.payload
        },

        startGetPosts(state) {
            state.loading = true
            state.error = false
        },

        getPostsSuccess(state, action) {
            state.loading = false
            state.posts = action.payload
        },

        getPostsFailed(state) {
            state.loading = false
            state.error = true
        },

        setSelectedSubreddit(state, action) {
            state.selectedSubReddit = action.payload;
            state.searchTerm = '';
        },

        toggleShowingComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments
        },

        startGetComments(state, action) {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
            if (!state.posts[action.payload].showingComments) {
                return
            }
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].error = false;
        },

        getCommentsSuccess(state, action) {
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },

        getCommentsFailed(state, action) {
          state.posts[action.payload].loadingComments = false;
          state.posts[action.payload].error = true;
        },
    }
});

export const {
  setPosts,
  getPostsFailed,
  getPostsSuccess,
  startGetPosts,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsFailed,
  getCommentsSuccess,
  startGetComments
} = redditSlice.actions;


export default redditSlice.reducer;


export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
        dispatch(startGetPosts());
        const posts = await getSubredditPosts(subreddit);
        console.log(posts)

        const postsWithMetadata = posts.map((post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            error: false
        }));
        dispatch(getPostsSuccess(postsWithMetadata));
        } catch (error) {
            dispatch(getPostsFailed());
        }
}


export const fetchComments = (index, permalink) => async (dispatch) => {
    try {
        dispatch(startGetComments(index));
        const comments = await getPostComments(permalink);

        dispatch(getCommentsSuccess({index, comments}));
        } catch (error) {
            dispatch(getCommentsFailed(index));
        }
}

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubReddit;

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        if (searchTerm !== '') {
            return posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }
        return posts;
    }
)