/************************ Components Imports **************************/
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn
} from 'mdb-react-ui-kit';
/************************ React Functionality Imports **************************/
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
/************************ Slices and utils **************************/
import {deletePostById} from '../features/db-posts/postsSlice';
/************************ Antd layouts **************************/

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /// Debugging
    const user_id = useSelector(state => state.user.id);
    const post_author_id = post.user.id;
    const isAuthor = post.user.id === useSelector(state => state.user.user.id);

    /************* Event handlers ************** */
    const handleViewPost = () => {
        console.log('post author id:', post_author_id);
        console.log('author id:', user_id);
        console.log(isAuthor)
        navigate(`/view-post/${post.id}`);
    };

    const handleDeletePost = () => {
        // delete post
        dispatch(deletePostById(post.id));
    }

    const handleEditPost = () => {
        // go to edit page
        navigate(`/edit-post/${post.id}`);
    }
    return (
        <>
            {/* In case no posts where added */}
            {/********************************/}
            <MDBCard alignment='center'>
                <MDBCardHeader>Created by {post.user.username}</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>{post.title}</MDBCardTitle>
                    <MDBCardText>{post.description}</MDBCardText>
                    <MDBBtn className='mx-3' color='primary' onClick={handleViewPost}>View</MDBBtn>

                    {isAuthor && (
                        <>
                            <MDBBtn className='mx-3' color='warning' onClick={handleEditPost}>Edit</MDBBtn>
                            <MDBBtn className='mx-3' color='danger' onClick={handleDeletePost}>Delete</MDBBtn>
                        </>
                    )}

                </MDBCardBody>
                <MDBCardFooter className=''>contains (x) visualizations </MDBCardFooter>
            </MDBCard>
        </>
    );
};

export default Post;