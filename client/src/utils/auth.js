import customFetch from "./axios";
import { addAccessTokenToLocalStorage, removeAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from './localStorage'
export async function refreshToken() {
    const refresh_token = getRefreshTokenFromLocalStorage();

    try {
        const response = await customFetch.post("/token/refresh", null, {
            headers: {
                Authorization: `Bearer ${refresh_token}`,
            },
        });
        addAccessTokenToLocalStorage(response.data.access_token);
    } catch (error) {
        console.log("Error refreshing access token:", error);
    }
}
