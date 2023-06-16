/***********************Components imports********************************/
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn
} from 'mdb-react-ui-kit';
/***********************React imports*************************************/
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePostByIdAsync } from '../../features/allPosts/allPostsSlice';
/***********************Slices imports************************************/

/***********************Utils imports*************************************/

const FinalPost = ({ post }) => {
    /*********** Setup ************ */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /*********** Hooks ************ */
    const user_id = useSelector(state => state.user.user.id);
    const post_author_id = post.user.id;
    const isAuthor = user_id === post_author_id;
    /*********** Event handlers ************ */
    const handleViewPost = () => {
        navigate(`/view-post/${post.id}`);
    };
    const handleDeletePost = () => {
        // delete post
        dispatch(deletePostByIdAsync(post.id));
    }
    const handleEditPost = () => {
        // go to edit page
        navigate(`/edit-post/${post.id}`);
    }
    return (
        <div className='my-4'>
            <MDBCard alignment='center'>
                <MDBCardHeader><i>Created by</i> {post.user.username}</MDBCardHeader>
                <MDBCardBody>
                    <MDBCardTitle>{post.title}</MDBCardTitle>
                    <MDBCardText>{post.description}</MDBCardText>
                    <MDBBtn className='mx-3' color='primary' onClick={handleViewPost}>View visualizations</MDBBtn>

                    {isAuthor && (
                        <>
                            <MDBBtn className='mx-3' color='warning' onClick={handleEditPost}>Edit</MDBBtn>
                            <MDBBtn className='mx-3' color='danger' onClick={handleDeletePost}>Delete</MDBBtn>
                        </>
                    )}

                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default FinalPost;