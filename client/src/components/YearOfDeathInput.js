import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const YearOfDeathInput = ({ form }) => {
    const [yearOfDeathValues, setYearOfDeathValues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/year_of_death/values');
            const years = response.data.filter((year) => year !== null);
            setYearOfDeathValues(years);
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
            <Checkbox onChange={handleCheckboxChange}>Year of death filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="year_of_death"
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
                placeholder="Select years of death"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...yearOfDeathValues.map((year) => ({
                        value: year,
                        label: year,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default YearOfDeathInput;