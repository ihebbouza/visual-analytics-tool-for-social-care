/************* Components imports **************** */
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/************* React imports **************** */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/************* Pages imports **************** */
import {Register, Error, FinalCreatePost, FinalEditPost, FinalViewPost, FinalAllPosts, FinalExploreDataset} from './pages';

// import { Landing, Register, Error, AddPost, AllPosts, ViewPost, EditPost } from "./pages";


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />}  />
        <Route path='/register' element={<Register />} />

        {/* <Route path='/add-post' element={<AddPost />} />
        <Route path='/view-post/:post_id' element={<ViewPost />} />
        <Route path='/edit-post/:post_id' element={<EditPost />} />
        <Route path='/all-posts' element={<AllPosts />} /> */}
        
        {/****** Latest **** */}
        <Route path='/explore-dataset' element={<FinalExploreDataset />} />
        <Route path='/create-post' element={<FinalCreatePost />} />
        <Route path='/edit-post/:post_id' element={<FinalEditPost />} />
        <Route path='/view-post/:post_id' element={<FinalViewPost />} />
        <Route path='/all-posts' element={<FinalAllPosts />} />
        <Route path='*' element={<Error />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
