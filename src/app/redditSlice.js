import { createSlice, createSelector } from "@reduxjs/toolkit";


const initialState = {
    posts: {},
    error: false,
    loading: false,
    searchTerm: '',
    selectedSubReddits: ''
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

        getPostSuccess(state, action) {
            state.loading = false
            state.posts = action.payload
        },

        getPostFail(state) {
            state.loading = false
            state.error = true
        }
    }
});

export const {
    setSearchTerm,
    setPosts,
    startGetPosts,
    getPostSuccess,
    getPostFail
} = redditSlice.actions;


export default redditSlice.reducer;