import { Button, Form, Input, Select, Spin } from 'antd';
import { useState, useEffect } from 'react';
import  customFetch  from '../utils/axios';

const { Option } = Select;

const DimensionInput = () => {
    const [dimensions, setDimensions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/labels');
            setDimensions(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
        }
        fetchData();
    }, []);

    return (
        <>
        <Form.Item
            name="dimension"
            label="Dimension"
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
                placeholder="Select a dimension for the chart"
                allowClear
                dropdownStyle={{ width: '100%' }}
            >
                {dimensions.map((option) => (
                <Option key={option} value={option}>
                    {option}
                </Option>
                ))}
            </Select>
            )}
        </Form.Item>
        </>
    );
};

export default DimensionInput;