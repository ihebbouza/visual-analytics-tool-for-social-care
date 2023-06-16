import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const ContactRouteInput = ({ form }) => {
    const [contactRouteValues, setContactRouteValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/contact_route/values');
            const contactRoutes = response.data.filter((contactRoute) => contactRoute !== null);
            setContactRouteValues(contactRoutes);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
        }
        fetchData();
    }, []);

    const handleCheckboxChange = (e) => {
        setShowSelect(e.target.checked);
    };

    return (
        <>
        <Form.Item>
            <Checkbox onChange={handleCheckboxChange}>Contact route filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="contact_route"
            rules={[
                {
                required: true,
                },
            ]}
            >
            {loading ? (
                <Spin />
            ) : (
                <Select
                mode="multiple"
                placeholder="Select contact route"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...contactRouteValues.map((contactRoute) => ({
                        value: contactRoute,
                        label: contactRoute,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default ContactRouteInput;