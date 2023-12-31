import {createSlice} from '@reduxjs/toolkit';
import {getSubreddits} from '../api/reddit';

const initialState = {
    subreddits: [],
    error: false,
    isLoading: false
};

const subRedditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        startGetSubreddits(state) {
            state.error = false
            state.isLoading = true
        },
        getSubredditsSuccess(state, action) {
            state.isLoading = false
            state.subreddits = action.payload
        },
        getSubredditsFailed(state) {
            state.isLoading = false
            state.error = true
        }
    }
})

export const {
    startGetSubreddits,
    getSubredditsFailed,
    getSubredditsSuccess
} = subRedditSlice.actions;

export default subRedditSlice.reducer;

export const fetchSubreddits = () => async (dispatch) => {
    try {
        dispatch(startGetSubreddits());
        const subreddits = await getSubreddits();
        dispatch(getSubredditsSuccess(subreddits))
    } catch(error) {
        dispatch(getSubredditsFailed())
    }
};


export const selectSubreddits = (state) => state.subreddits.subreddits;