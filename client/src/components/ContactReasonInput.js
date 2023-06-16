import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const ContactReasonInput = ({ form }) => {
    const [contacReasonValues, setContactReasonValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/contact_reason/values');
            const contactReasons = response.data.filter((contactReason) => contactReason !== null);
            setContactReasonValues(contactReasons);
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
            <Checkbox onChange={handleCheckboxChange}>Contact reason filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="contact_reason"
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
                placeholder="Select contact reason"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...contacReasonValues.map((contactReason) => ({
                        value: contactReason,
                        label: contactReason,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default ContactReasonInput;