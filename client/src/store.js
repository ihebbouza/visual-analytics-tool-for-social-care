import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
// import postsSlice from './features/posts/postsSlice';
import visualizationDataSlice from './features/visualizationData/visualizationDataSlice';
/* New Slices */ 
/***** Latest ***** */
import createPostSlice from './features/createPost/createPostSlice';
import viewPostSlice from './features/viewPost/viewPostSlice';
import editPostSlice from './features/editPost/editPostSlice';
import allPostSlice from './features/allPosts/allPostsSlice';
export const store = configureStore({
    reducer: {
        user: userSlice,
        visualizationData: visualizationDataSlice,
        /***** Latest ****** */
        createPost: createPostSlice,
        viewPost: viewPostSlice,
        editPost: editPostSlice,
        allPosts: allPostSlice,
    },
});