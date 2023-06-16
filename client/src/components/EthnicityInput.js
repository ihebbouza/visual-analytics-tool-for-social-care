import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const EthnicityInput = ({ form }) => {
    const [ethnicityValues, setEthnicityValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/ethnicity/values');
            const ethnicities = response.data.filter((ethnicity) => ethnicity !== null);
            setEthnicityValues(ethnicities);
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
            <Checkbox onChange={handleCheckboxChange}>Ethnicity filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="ethnicity"
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
                placeholder="Select ethnicity"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...ethnicityValues.map((gender) => ({
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

export default EthnicityInput;