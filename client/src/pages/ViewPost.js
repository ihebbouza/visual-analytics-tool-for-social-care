/************************ Components Imports **************************/
import {Post, AllDBVisualizations, Navbar} from '../components';
import { Button, Row, Col } from 'antd';
/************************ React Functionality Imports **************************/
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/************************ Slices and utils **************************/
import { getPostById, getPostVisualizations } from '../features/db-posts/postsSlice';
import {editModeOff} from '../utils/EditModeSetup';
import { setViewMode } from '../features/user/userSlice';
/************************ Antd layouts **************************/
import {viewModeOn} from '../utils/viewModeSetup';


const ViewPost = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const { post_id } = useParams();
    /****************** Rendering *********************** */
    // set mode to view mode
    useEffect(() => {
        dispatch(setViewMode(true));
    })
    
    // get the post by id in the parameters
    useEffect(() => {
        dispatch(getPostById(post_id));
    }, [post_id])
    // In case the post is ready 
    return (
        <>
            <Navbar/>
            <div className='m-4'>
                {/*  Display all post visualizations */}
                <AllDBVisualizations/>
            </div>
        </>
    );
};

export default viewModeOn(ViewPost);