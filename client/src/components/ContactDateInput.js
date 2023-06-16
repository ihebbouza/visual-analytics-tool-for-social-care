import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const ContactDateInput = ({ form }) => {
    const [contactDateValues, setContactDateValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/contact_date/values');
            const contactDates = response.data.filter((contactDate) => contactDate !== null);
            setContactDateValues(contactDates);
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
            <Checkbox onChange={handleCheckboxChange}>Contact date filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="contact_date"
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
                placeholder="Select contact dates"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...contactDateValues.map((contactDate) => ({
                        value: contactDate,
                        label: contactDate,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default ContactDateInput;