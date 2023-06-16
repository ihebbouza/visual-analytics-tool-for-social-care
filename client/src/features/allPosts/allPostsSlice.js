/***************Slice imports****************** */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
/***************Utils imports******************** */
/************************************************ */
import { getAllPosts, deletePostById } from './allPostsThunk';
/************* Initial state **************** */
const initialState = {
    allPosts: [],
    allPostsLoading: false,
    // Delete a post is here because it updates all posts
    postDeleteLoading: false
}

/************* Thunks ****************** */
export const getAllPostsAsync = createAsyncThunk(
    'posts/getAllPosts',
    getAllPosts
)

export const deletePostByIdAsync = createAsyncThunk(
    'post/deletePostById',
    async (postId, thunkAPI) => {
        try {
            const response = await deletePostById(postId, thunkAPI);
            thunkAPI.dispatch(getAllPostsAsync()); // Call the thunk to update the state in the page automatically
            return postId;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)



/************* Slice **************** */
const createAllPostsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {
        // no synchronous reducers for now
    },
    extraReducers: {
        [getAllPostsAsync.pending]: (state) => {
            state.allPostsLoading = true;
        },
        [getAllPostsAsync.fulfilled]: (state, { payload }) => {
            state.allPostsLoading = false;
            state.allPosts = payload;
        },
        [getAllPostsAsync.rejected]: (state, { payload }) => {
            state.allPostsLoading = false;
            toast.error('Failed to fetch all posts from the DB');
        },
        [deletePostByIdAsync.pending]: (state) => {
            state.postDeleteLoading = true;
        },
        [deletePostByIdAsync.fulfilled]: (state, { payload }) => {
            state.postDeleteLoading = false;
            // filter the current all post and remove the deleted one
            state.allPosts = state.allPosts.filter(post => post.id !== payload);
            toast.success('Post successfully deleted from the DB');
        },
        [deletePostByIdAsync.rejected]: (state, { payload }) => {
            state.postDeleteLoading = false;
            toast.error('Failed to delete the post from the DB');
        },
    }
})

/************* Exports **************** */
export const {} = createAllPostsSlice.actions;

// Export the thunks (API // Async actions)
export default createAllPostsSlice.reducer;