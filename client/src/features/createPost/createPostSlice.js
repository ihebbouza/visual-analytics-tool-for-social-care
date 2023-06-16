/***************Slice imports****************** */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { appendVisualizationToLocalStorage, generateUniqueIndex, getVisualizationsFromLocalStorage, initializeVisualizations, removeVisualizationFromLocalStorage } from '../../utils/localStorage';
import { createPost, addVisualizationToPost } from './createPostThunk';
/***************Utils imports******************** */
/************************************************ */
/***************Structure of a postToCreate****************** */
/*
    {
        index: 0,
        title: 'title',
        description: 'description',
        visualizations: [
            {
                index: 0,
                dimensions: '',
                title: 'title',
                description: 'description'
                parameters: []
            }
        ]
    }
*/

/************* Initial state **************** */
const initialState = {
    postToCreate: {
        title: '',
        description: '',
        visualizations: getVisualizationsFromLocalStorage()
    },
    createPostIsLoading: false,
}

/************* Thunks ****************** */
export const createPostAsync = createAsyncThunk(
    'post/createPost',
    createPost
)
export const addVisualizationToPostAsync = createAsyncThunk(
    'visualization/post/addVisualizationToPost',
    addVisualizationToPost
)


/************* Slice **************** */
const createCreatePost = createSlice({
    name: 'createPost',
    initialState,
    reducers: {
        /* Append visualization */
        appendCreatePostVisualization: (state, { payload }) => {
            try {
                initializeVisualizations();
                const index = generateUniqueIndex();
                const visualization = {
                    index,
                    ...payload
                }
                appendVisualizationToLocalStorage(visualization);
                console.log('Visualization successfully appended to local storage...')
                state.postToCreate.visualizations.push(visualization);
                console.log('post To Create state updated to: ', state.postToCreate)
            } catch (error) {
                toast.error('Error apppending visualization to local storage');
            }
        },
        /* Delete visualization */
        deleteCreatePostVisualization: (state, { payload }) => {
            try {
                const index = state.postToCreate.visualizations.findIndex(v => v.index === payload.index);
                if (index !== -1) {
                    removeVisualizationFromLocalStorage(payload.index);
                    state.postToCreate.visualizations.splice(index, 1);
                }
            } catch (error) {
                toast.error('Error removing visualization from local storage');
            }
        },
        setTitle: (state, { payload }) => {
            try {
                state.postToCreate.title = payload;
            } catch(error) {
                toast.error('Failed to set title');
            }
            
        },
        setDescription: (state, { payload }) => {
            try {
                state.postToCreate.description = payload;
            } catch(error) {
                toast.error('Failed to set description');
            }
        }
    },
    extraReducers: {
        [createPostAsync.pending]: (state) => {
            state.createPostIsLoading = true;
        },
        [createPostAsync.fulfilled]: (state, { payload }) => {
            state.createPostIsLoading = false;
            toast.success('Post created successfully');
        },
        [createPostAsync.rejected]: (state, { payload }) => {
            state.createPostIsLoading = false;
            toast.error('Failed to create post');
        },
        [addVisualizationToPostAsync.pending]: (state) => {
            state.createPostIsLoading = true;
        },
        [addVisualizationToPostAsync.fulfilled]: (state, { payload }) => {
            state.createPostIsLoading = false;
            // emptying the postToCreate
            toast.success('visualization added to the post successfully');
        },
        [addVisualizationToPostAsync.rejected]: (state, { payload }) => {
            state.createPostIsLoading = false;
            toast.error('Failed to add visualization to the post');
        },
    }
})

/************* Exports **************** */
export const { appendCreatePostVisualization, deleteCreatePostVisualization, setTitle, setDescription } = createCreatePost.actions;

// Export the thunks (API // Async actions)
export default createCreatePost.reducer;