import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const VisiDescriptionInput = ({ form }) => {
    const [visitDescriptionValues, setVisitDescriptionValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/visit_description/values');
            const visitDescriptions = response.data.filter((visitDescription) => visitDescription !== null);
            setVisitDescriptionValues(visitDescriptions);
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
            <Checkbox onChange={handleCheckboxChange}>Visit description filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="visit_description"
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
                placeholder="Select visit description"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...visitDescriptionValues.map((visitDescription) => ({
                        value: visitDescription,
                        label: visitDescription,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default VisiDescriptionInput;