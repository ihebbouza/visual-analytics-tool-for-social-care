import React, { Component } from'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/db-posts/postsSlice';

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const handleCreatePost = async (values) => {
        const { title, description } = values;
        try {
            const postCreateResponse = await dispatch(createPost({title, description}));  
            const post_id = postCreateResponse.payload.id;

            console.log(post_id)
        } catch (error) {
            console.error("Error in post creation: ", error);
        }
    }
    return (
        <Form
            name="basic"
            labelCol={{
            span: 8,
            }}
            wrapperCol={{
            span: 16,
            }}
            style={{
            maxWidth: 600,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={handleCreatePost}
            autoComplete="off"
        >
            <Form.Item
            label="Title"
            name="title"
            rules={[
                {
                required: true,
                message: 'Please input the title!',
                },
            ]}
            >
                <Input />
            </Form.Item>
    
            <Form.Item
            label="description"
            name="description"
            rules={[
                {
                required: true,
                message: 'Please input the description!',
                },
            ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
    );
}

export default CreatePostForm;