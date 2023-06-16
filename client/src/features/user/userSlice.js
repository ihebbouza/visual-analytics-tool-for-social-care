// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
    removeRefreshTokenFromLocalStorage,
    removeAccessTokenFromLocalStorage,
    addRefreshTokenToLocalStorage,
    addAccessTokenToLocalStorage,
    addUserToLocalStorage,
    getUserFromLocalStorage,
    removeUserFromLocalStorage,
    removeAllVisualizationsFromLocalStorage,
    initializeEditMode,
    removeEditMode
} from '../../utils/localStorage';

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
    mode: '',
};

export const registerUser = createAsyncThunk(
    '/register',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/register', user);
            console.log(resp.data);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    '/login',
    async (user, thunkAPI) => {
        try {
            const resp = await customFetch.post('/login', user);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
        state.user = null;
            removeUserFromLocalStorage();
            removeAccessTokenFromLocalStorage();
            removeRefreshTokenFromLocalStorage();
            removeAllVisualizationsFromLocalStorage();
            removeEditMode();
        },
        setEditMode: (state) => {
            state.mode = 'edit';
        },
        setCreateMode: (state) => {
            state.mode = 'create';
        },
        setViewMode: (state) => {
            state.mode = 'view';
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            const { user, access_token, refresh_token } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            addAccessTokenToLocalStorage(access_token);
            addRefreshTokenToLocalStorage(refresh_token);
            initializeEditMode();
            toast.success(`Hello ${user.username}`);
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            const { user, access_token, refresh_token } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            addAccessTokenToLocalStorage(access_token);
            addRefreshTokenToLocalStorage(refresh_token);
            initializeEditMode();
            toast.success(`Welcome Back ${user.username}`);
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
    },
});

export const { setShowMode, logoutUser, setEditMode, setViewMode, setAddMode, setCreateMode } = userSlice.actions;
export default userSlice.reducer;