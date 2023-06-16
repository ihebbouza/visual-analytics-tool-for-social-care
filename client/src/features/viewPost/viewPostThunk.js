import customFetch from '../../utils/axios';
import { getAccessTokenFromLocalStorage } from '../../utils/localStorage';

export const getPostVisualizationsById = async (post_id, thunkAPI) => {
    try {
        const access_token = getAccessTokenFromLocalStorage();
        const resp = await customFetch.get(`/post/${post_id}/visualizations`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return resp.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
};
