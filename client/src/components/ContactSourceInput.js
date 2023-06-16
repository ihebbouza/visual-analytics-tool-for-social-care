import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const ContactSourceInput = ({ form }) => {
    const [contactSourcesValues, setContactSourcesValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/contact_source/values');
            const contactSources = response.data.filter((contactSource) => contactSource !== null);
            setContactSourcesValues(contactSources);
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
            <Checkbox onChange={handleCheckboxChange}>Contact source filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="contact_source"
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
                placeholder="Select contact source"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...contactSourcesValues.map((contactSource) => ({
                        value: contactSource,
                        label: contactSource,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default ContactSourceInput;