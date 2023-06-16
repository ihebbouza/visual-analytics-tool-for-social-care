import React from 'react';
import { Select, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const MonthsBetweenContactAndVisitInput = ({ form }) => {
    const [monthsBetweenContactAndVisitValues, setMonthsBetweenContactAndVisit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/months_between_contact_and_visit/values');
            const monthsBetweenContactAndVisit = response.data.filter((monthBetweenContactAndVisit) => monthBetweenContactAndVisit !== null);
            setMonthsBetweenContactAndVisit(monthsBetweenContactAndVisit);
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
            <Checkbox onChange={handleCheckboxChange}>Months between contact and visit filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="months_between_contact_and_visit"
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
                placeholder="Select number of months between contact and visit description"
                style={{
                    width: '100%',
                }}
                options={[
                    { value: null, label: 'null' },
                    ...monthsBetweenContactAndVisitValues.map((monthBetweenContactAndVisit) => ({
                        value: monthBetweenContactAndVisit,
                        label: monthBetweenContactAndVisit,
                    })),
                ]}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default MonthsBetweenContactAndVisitInput;