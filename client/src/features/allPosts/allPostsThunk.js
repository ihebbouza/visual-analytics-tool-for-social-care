import customFetch from '../../utils/axios';
import { getAccessTokenFromLocalStorage } from '../../utils/localStorage';


// get all posts from DB
export const getAllPosts = async (thunkAPI) => {
    try {
        const access_token = getAccessTokenFromLocalStorage();
        const resp = await customFetch.get(`/posts`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

// Delete a Post by ID
export const deletePostById = async (post_id, thunkAPI) => {
    try {
        const access_token = getAccessTokenFromLocalStorage();
        const resp = await customFetch.delete(`/post/${post_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

// Delete all post visualization
