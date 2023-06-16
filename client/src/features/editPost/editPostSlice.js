/***************Slice imports****************** */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {  deletePost, updatePost, deleteVisualizationFromPost, saveVisualizationToPost, getPostById } from './editPostThunk';
import { appendEditVisualizationToLocalStorage, generateUniqueEditIndex, initializeEditVisualizations, removeEditVisualizationFromLocalStorage, setEditVisualizations } from '../../utils/localStorage';
/***************Structure of a postInDB****************** */
/*
    {
        title: 'title',
        description: 'description',
        visualizations: [
            {
                index/id: 0,
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
    postInDB: null,
    postInDBIsLoading: false,
    postInEditing: null,
    postInEditingIsLoading: false
}

/************* Thunks ****************** */
export const getEditPostByIdAsync = createAsyncThunk(
    'post/getPostById',
    getPostById
)

export const updatePostByIdAsync = createAsyncThunk(
    'post/updatePostById',
    updatePost
)


export const deleteVisualizationFromPostAsync = createAsyncThunk(
    'visualization/post/deleteVisualizationFromPost',
    deleteVisualizationFromPost
)

export const saveVisualizationToPostAsync = createAsyncThunk(
    'visaulization/saveVisualiationToPost',
    saveVisualizationToPost
)

// updating post Algorithm

/************* Slice ****************** */
const createEditPost = createSlice({
    name: 'editPost',
    initialState,
    reducers: {
        /** Append visualization in edit mode (local storage) **/
        /** Delete visualization **/
        appendEditPostVisualization: (state, { payload }) => {
            try {
                initializeEditVisualizations();
                const index_edit = generateUniqueEditIndex();
                const visualization = {
                    index_edit,
                    ...payload
                }
                appendEditVisualizationToLocalStorage(visualization);
                console.log('Visualization successfully appended to local storage in edit mode...')
                state.postInEditing.visualizations.push(visualization);
                console.log('post To Edit state updated to: ', state.postInEditing);
            } catch (error) {
                toast.error('Error apppending visualization to local storage in edit mode');
            }
        },
        deleteEditPostVisualization: (state, { payload }) => {
            try {
                const index = state.postInEditing.visualizations.findIndex(v => v.index_edit === payload.index_edit);
                if (index !== -1) {
                    console.log('Deleting visualization at index:', index);
                    console.log('Before deletion:', JSON.parse(JSON.stringify(state.postInEditing.visualizations)));
        
                    state.postInEditing.visualizations.splice(index, 1);
                    setEditVisualizations(state.postInEditing.visualizations);
        
                    console.log('After deletion:', JSON.parse(JSON.stringify(state.postInEditing.visualizations)));
                } else {
                    console.warn('Visualization not found for deletion:', payload);
                }
            } catch (error) {
                toast.error('Error removing visualization from local storage in edit mode');
            }
        },
    },
    extraReducers: {
         /* get post **/
        [getEditPostByIdAsync.pending]: (state) => {
            state.postInDBIsLoading = true;
        },
        [getEditPostByIdAsync.fulfilled]: (state, { payload }) => {
            state.postInDBIsLoading = false;
            initializeEditVisualizations();
            // set edit_visualization in local storage
            const newPostInDB = JSON.parse(JSON.stringify(payload));
            state.postInDB = newPostInDB;
            state.postInDB.visualizations = newPostInDB.visualizations.map((visualization) => {
                // return a new object with index_edit added
                const index_edit = generateUniqueEditIndex();
                visualization.index_edit = index_edit;
                appendEditVisualizationToLocalStorage(visualization);
                return visualization;
            });
            state.postInEditing = state.postInDB;
            setEditVisualizations(state.postInEditing.visualizations);
            toast.success("Current post fetched successfully and visualizations saved to local storage");
        },
        [getEditPostByIdAsync.rejected]: (state, { payload }) => {
            state.postInDBIsLoading = false;
            toast.error("Failed to fetch current post from DB");
        },
        /* update post **/
        [updatePostByIdAsync.pending]: (state) => {
            state.postInEditingIsLoading = true;
        },
        [updatePostByIdAsync.fulfilled]: (state, { payload }) => {
            state.postInEditingIsLoading = false;
            // set edit_visualization in local storage
            state.postInEditing = null;
            state.postInDB = null;
            toast.success("Current post updated successfully");
        },
        [updatePostByIdAsync.rejected]: (state, { payload }) => {
            state.postInEditing = false;
            toast.error(`Failed to update the current post`);
        },
        /* Save visualization **/
        [saveVisualizationToPostAsync.pending]: (state) => {
            state.postInEditing = true;
        },
        [saveVisualizationToPostAsync.fulfilled]: (state, { payload }) => {
            state.postInEditingIsLoading = false;
            // set edit_visualization in local storage
            state.postInEditingIsLoading = payload;
            toast.success("Visualization added successfully");
        },
        [saveVisualizationToPostAsync.rejected]: (state, { payload }) => {
            state.postInEditingIsLoading = false;
            toast.error(`Failed to add the visualization`);
        },
        /* Delete visualization **/
        [deleteVisualizationFromPostAsync.pending]: (state) => {
            state.postInEditingIsLoading = true;
        },
        [deleteVisualizationFromPostAsync.fulfilled]: (state, { payload }) => {
            state.postInEditingIsLoading = false;
            // set edit_visualization in local storage
            toast.success("Visualization deleted from DB successfully");
        },
        [deleteVisualizationFromPostAsync.rejected]: (state, { payload }) => {
            state.postInEditingIsLoading = false;
            toast.error(`Failed to delete the visualization from DB`);
        },
    }
})

/************* Exports **************** */
export const { appendEditPostVisualization,  deleteEditPostVisualization } = createEditPost.actions;

// Export the thunks (API // Async actions)
export default createEditPost.reducer;