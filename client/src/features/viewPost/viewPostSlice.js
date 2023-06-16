/***************Slice imports****************** */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { getPostVisualizationsById } from "./viewPostThunk";
/***************Utils imports******************** */
/************************************************ */

const initialState = {
    postVisualizations: [],
    postVisualizationsLoading: false,
    /* The view post should only contain the post selected visualizations */
};

/************* Thunks ****************** */
export const getPostVisualizationsByIdAsync = createAsyncThunk(
    "post/getPostVisualizationsById",
    getPostVisualizationsById
);

// export const deletePostByIdAsync = createAsyncThunk(
//     "post/deletePostById",
//     deletePostById
// );

/************* Slice **************** */
const createViewPostSlice = createSlice({
    name: "viewPost",
    initialState,
    reducers: {},
    extraReducers: {
        [getPostVisualizationsByIdAsync.pending]: (state) => {
            state.postVisualizationsLoading = true;
        },
        [getPostVisualizationsByIdAsync.fulfilled]: (state, { payload }) => {
            state.postVisualizationsLoading = false;
            state.postVisualizations = payload;
            toast.success("All post visualizaitons fetched successfully from the DB");
        },
        [getPostVisualizationsByIdAsync.rejected]: (state, { payload }) => {
            // Payload is seful only when the rejected request has a response
            state.postVisualizationsLoading = false;
            toast.error("Failed to fetch the post visualizations from DB");
        }
    },
});

/************* Exports **************** */
export const {} = createViewPostSlice.actions;
export default createViewPostSlice.reducer;
