import customFetch from '../../utils/axios';
import { getAccessTokenFromLocalStorage } from '../../utils/localStorage';

// get post by id
export const getPostById = async (post_id, thunkAPI) => {
    try {
        const access_token = getAccessTokenFromLocalStorage();
        const resp = await customFetch.get(`/post/${post_id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};

// update post according by comparing the changes made in the local storage with the changes made in the database

// update a posts title and description
export const updatePost = async ({post_id, post}, thunkAPI) => {
    try {
        const access_token = getAccessTokenFromLocalStorage();
        const resp = await customFetch.put(`/post/${post_id}`, post, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}

// delete visualization (from post)
export const deleteVisualizationFromPost = async (visualization_id, thunkAPI) => {
        try {
            const access_token = getAccessTokenFromLocalStorage();
            const resp = await customFetch.delete(`/visualization/${visualization_id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            return resp.data;
        } 
        
        catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
}


// save visualziaiton to post
export const saveVisualizationToPost = async ({post_id, visualization}, thunkAPI) => {
        try {
            const access_token = getAccessTokenFromLocalStorage();
            console.log('data to send: ', visualization);
            const response = await customFetch.post(`/visualization/post/${post_id}`, visualization, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }

// deleting the post