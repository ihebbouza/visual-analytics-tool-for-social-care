/***********************Components imports********************************/
import { FinalPost, FinalVisualizationList, Navbar } from "../../components";
import { Button, Row, Col } from "antd";
/***********************React imports*************************************/
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
/***********************Slices imports************************************/
import { getPostVisualizationsByIdAsync } from "../../features/viewPost/viewPostSlice";
import { setViewMode } from "../../features/user/userSlice";
/***********************Utils imports*************************************/

const FinalViewPost = () => {
    /*************** Setup **************** */
    const dispatch = useDispatch();
    const { post_id } = useParams(); // the post to visualize id 
    /*************** Hooks **************** */
    // Set the user mode to view
    useEffect(() => {
        dispatch(setViewMode());
    });

    useEffect(() => {
        dispatch(getPostVisualizationsByIdAsync(post_id))
    }, [post_id])
    /*************** Event handlers **************** */
    return (
        <>
        <Navbar />
        <div className="m-4">
            {/*  Display all post visualizations */}
            <FinalVisualizationList />
        </div>
        </>
    );
};

export default FinalViewPost;
