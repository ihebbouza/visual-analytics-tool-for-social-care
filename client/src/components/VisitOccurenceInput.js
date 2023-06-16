import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const VisitOccurrenceInput = ({ form }) => {
    const [visitOccurrenceValues, setvisitOccurrenceValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/visit_occurrence/values');
            const visitOccurrences = response.data.filter((visitOccurrence) => visitOccurrence !== null);
            setvisitOccurrenceValues(visitOccurrences);
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
            <Checkbox onChange={handleCheckboxChange}>Visit occurrence filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="visit_occurrence"
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
                    ...visitOccurrenceValues.map((visitOccurrence) => ({
                        value: visitOccurrence,
                        label: visitOccurrence,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default VisitOccurrenceInput;