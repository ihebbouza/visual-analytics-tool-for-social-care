/***********************Components imports********************************/
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Navbar, FinalAddVisualization, FinalVisualizationList } from "../../components";
import { Button, Modal, Form, Input } from 'antd';
/***********************React imports*************************************/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
/***********************Slices imports************************************/
import { setEditMode } from '../../features/user/userSlice'; 
import { getEditPostByIdAsync, updatePostByIdAsync, deleteVisualizationFromPostAsync, saveVisualizationToPostAsync } from '../../features/editPost/editPostSlice';
import { removeAllEditVisualizationsFromLocalStorage } from '../../utils/localStorage';
/***********************Utils imports*************************************/
import { getIsFirstLoad, setIsFirstLoad } from '../../utils/localStorage';
import { getEditVisualizationsFromLocalStorage } from '../../utils/localStorage';


/********* Layout: Modal ************ */
const modalFormLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};


const FinalEditPost = () => {
     /************ Declarations ****************** */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { post_id } = useParams();
    /************ Setups ******************* */
    const { postInDBIsLoading, postInEditingIsLoading, postInDB, postInEditing } = useSelector(state => state.editPost);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hasFetchedData, setHasFetchedData] = useState(false);
    /************* UseEffect ****************** */
    // Set the user mode to create in this page
    useEffect(() => {
        dispatch(setEditMode());
    });

    useEffect(() => {
            dispatch(getEditPostByIdAsync(post_id));
    }, [post_id]);

    /************* Event handlers ****************** */
    const showCreatePostModal = () => {
        setIsModalVisible(true);
    }
    const handleCancelCreatePostModal = () => {
        setIsModalVisible(false);
    };
    /* Updating a post (Adding removind temporary visualizations) */
    const handleUpdatePost = async (values) => {
        // !! algorithm to apply the changes by comparing them to the initial state in the DB
        const { title, description } = values;
        const postData = {
            title,
            description
        };
        // checking the visualizations and whether there are new ones:
         // Replace this with the actual function to get visualizations from localStorage
        for (const visualization of postInEditing.visualizations) {
            if (!visualization.id) {
                // Save the visualization to the post if it doesn't have an id
                /***  Remove index from object and send it **** */
                const {title, description, dimension, parameters, type} = visualization;
                const visualizationData = {
                    title,
                    description,
                    dimension,
                    parameters,
                    type
                }
                try {
                    await dispatch(saveVisualizationToPostAsync({ post_id, visualization: visualizationData }));
                } catch (error) {
                    console.error("Error saving visualization to post:", error);
                }
            }
        }
        for (const visualizationInDB of postInDB.visualizations) {
            if (!postInEditing.visualizations.some(v => v.index_edit === visualizationInDB.index_edit)) {
                try {
                    const visualization_id = visualizationInDB.id;
                    await dispatch(deleteVisualizationFromPostAsync(visualization_id));
                } catch (error) {
                    console.error("Error deleting visualization from post:", error);
                }
            }
        }
        if (postInDB.title !== title || postInDB.description !== description) {
            const newupdatedpost = await dispatch(updatePostByIdAsync({ post_id, post: postData }));
        }
        removeAllEditVisualizationsFromLocalStorage();
        navigate('/all-posts');
    };
    return (
        <>
        <Navbar/>
        <div className='mx-4'>
            <MDBRow className="justify-content-center">
                <MDBCol className="my-2 text-center">
                    <Button type="primary" size="large" onClick={showCreatePostModal} style={{ marginTop: '15px' }}>
                        <strong>Update Post</strong>
                    </Button>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol size='3'>
                    <FinalAddVisualization/>
                </MDBCol>
                <MDBCol size='md'>
                    <FinalVisualizationList/>
                </MDBCol>
            </MDBRow>
            {/***************** Modal: Create post ************************ */}
            <Modal title="Create Post" visible={isModalVisible} onCancel={handleCancelCreatePostModal} footer={null} centered>
                <Form
                    {...modalFormLayout}
                    name="create-post-form"
                    onFinish={handleUpdatePost} /* When the modal is submitted */
                >
                    <Form.Item
                        name="title"
                        label="Post Title"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the title of the post!',
                            },
                        ]}
                    >
                        <Input showCount maxLength={60}/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Post Description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the description of the post!',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={600}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                        <Button type="primary" size="large" htmlType="submit" block loading={postInEditingIsLoading ? true : false}>
                            Update post
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    </>
    )
}

export default FinalEditPost;
