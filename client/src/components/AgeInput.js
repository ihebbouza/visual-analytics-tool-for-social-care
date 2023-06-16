import React from 'react';
import { Slider, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const AgeInput = ({ form }) => {
    const [ageRange, setAgeRange] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSlider, setShowSlider] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/age/values');
            const ages = response.data;
            const minValue = Math.min(...ages);
            const maxValue = Math.max(...ages);
            const minMaxValues = [minValue, maxValue];
            setAgeRange(minMaxValues);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
        }
        fetchData();
    }, []);

    const handleCheckboxChange = (e) => {
        setShowSlider(e.target.checked);
    };

    return (
        <>
        <Form.Item>
            <Checkbox onChange={handleCheckboxChange}>Age Filter</Checkbox>
        </Form.Item>
        {showSlider && (
            <>
            <Form.Item label="Age" name="age">
                {loading ? (
                <Spin />
                ) : (
                <Slider
                    range
                    draggableTrack
                    defaultValue={ageRange}
                    min={ageRange[0]}
                    max={ageRange[1]}
                />
                )}
            </Form.Item>
            </>
        )}
        </>
    );
};

export default AgeInput;