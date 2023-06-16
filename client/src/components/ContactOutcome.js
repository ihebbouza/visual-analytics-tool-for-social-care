import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const ContactOutcomeInput = ({ form }) => {
    const [contactOutcomeValues, setContactOutcomeValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/contact_outcome/values');
            const contactOutcomes = response.data.filter((contactOutcome) => contactOutcome !== null);
            setContactOutcomeValues(contactOutcomes);
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
            <Checkbox onChange={handleCheckboxChange}>Contact outcome filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="contact_outcome"
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
                placeholder="Select contact outcome"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...contactOutcomeValues.map((contactOutcome) => ({
                        value: contactOutcome,
                        label: contactOutcome,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default ContactOutcomeInput;