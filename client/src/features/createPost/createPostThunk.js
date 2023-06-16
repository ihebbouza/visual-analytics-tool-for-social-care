import customFetch from '../../utils/axios';
import { getAccessTokenFromLocalStorage } from '../../utils/localStorage';

// create visualization
export const addVisualizationToPost = async ({post_id, visualization}, thunkAPI) => {
    try {
        const access_token = getAccessTokenFromLocalStorage();
        const resp = await customFetch.post(`/visualization/post/${post_id}`, visualization, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

// create post
export const createPost = async (post, thunkAPI) => {
    try {
        const access_token = getAccessTokenFromLocalStorage();
        const resp = await customFetch.post('/post', post, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};