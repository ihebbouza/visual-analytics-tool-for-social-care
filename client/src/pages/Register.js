import React, { useState, useEffect } from 'react';
import { Tabs, Input, Button, Form, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
const { TabPane } = Tabs;

const Register = () => {
    const { user, isLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
        setTimeout(() => {
            navigate('/create-post');
        }, 500);
        }
    }, [user]);

    const onLoginFinish = (values) => {
        const { username, password } = values;
        if (!username || !password) {
            notification.error({ message: 'Please fill all fields' });
            return;
        }
        
        dispatch(loginUser({ username, password }));
    };

    const onRegisterFinish = (values) => {
        const { username, email, password } = values;
        if (!username || !password || !email) {
            notification.error({ message: 'Please fill all fields' });
            return;
        }
        dispatch(registerUser({ username, email, password }));
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 50 }}>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Login" key="1">
            <Form onFinish={onLoginFinish}>
                <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} block>
                    Sign in
                </Button>
                </Form.Item>
            </Form>
            </TabPane>
            <TabPane tab="Register" key="2">
            <Form onFinish={onRegisterFinish}>
                <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
                >
                <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} block>
                    Sign up
                </Button>
                </Form.Item>
            </Form>
            </TabPane>
        </Tabs>
        </div>
    );
};

export default Register;