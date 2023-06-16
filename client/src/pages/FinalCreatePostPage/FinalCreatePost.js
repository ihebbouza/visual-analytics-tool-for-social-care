/***********************Components imports********************************/
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Navbar, FinalAddVisualization, FinalVisualizationList } from "../../components";
import { Button, Modal, Form, Input } from 'antd';
/***********************React imports*************************************/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
/***********************Slices imports************************************/
import { setCreateMode } from '../../features/user/userSlice'; 
import { createPostAsync, addVisualizationToPostAsync } from '../../features/createPost/createPostSlice';
import { removeAllVisualizationsFromLocalStorage } from '../../utils/localStorage';

/***********************Utils imports*************************************/


/********* Layout: Modal ************ */
const modalFormLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const FinalCreatePost = () => {
    /************ Declarations ****************** */
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { createPostIsLoading } = useSelector((state) => state.createPost.postToCreate)
    const visualizations  = useSelector((state) => state.createPost.postToCreate.visualizations)
    /************ Setups ******************* */
    const [isModalVisible, setIsModalVisible] = useState(false);
    /************* UseEffect ****************** */
    // Set the user mode to create in this page
    useEffect(() => {
        dispatch(setCreateMode())
    })
    /************* Event handlers ****************** */
    const showCreatePostModal = () => {
        setIsModalVisible(true);
    }
    const handleCancelCreatePostModal = () => {
        setIsModalVisible(false);
    };
    const handleCreatePost = async (values) => {
        const {title, description} = values;
        console.log(values);
        try {
            const createPostResponse = await dispatch(createPostAsync(values));
            const post_id = createPostResponse.payload.id;
            if (visualizations.length > 0) {
                for (const visualization of visualizations) {
                    const { title, description, type, dimension, parameters } = visualization;
                    const visualizationData = {
                        title,
                        description,
                        type,
                        dimension,
                        parameters
                    }
                    const addVisualizationToPostResponse = await dispatch(addVisualizationToPostAsync({post_id, visualization: visualizationData}));
                    console.log('Visualization added: ', addVisualizationToPostResponse.payload);
                    // Modal
                    
                }
            }
            setIsModalVisible(false);
            // clear visualziations variable from local storage
            removeAllVisualizationsFromLocalStorage();
            // navigate to all posts page
            navigate('/all-posts');
        } catch (error) {
            console.log('Faled to add the created post and its visualizations to the DB: ', error);
        }
    };
    return (
        <>
            <Navbar/>
            <div className='mx-4'>
                <MDBRow className="justify-content-center">
                    <MDBCol className="my-2 text-center">
                        <Button type="primary" size="large" onClick={showCreatePostModal} style={{ marginTop: '15px' }}>
                            <strong>Create Post</strong>
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
                        onFinish={handleCreatePost} /* When the modal is submitted */
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
                            <Button type="primary" size="large" htmlType="submit" block loading={createPostIsLoading ? true : false}>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    )
}

export default FinalCreatePost;