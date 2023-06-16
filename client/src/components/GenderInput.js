import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const GenderInput = ({ form }) => {
    const [genderValues, setGenderValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/gender/values');
            const genders = response.data.filter((gender) => gender !== null);
            setGenderValues(genders);
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
            <Checkbox onChange={handleCheckboxChange}>Gender filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="gender"
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
                placeholder="Select gender"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...genderValues.map((gender) => ({
                        value: gender,
                        label: gender,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default GenderInput;