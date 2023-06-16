import React from 'react';
import { Slider, Form, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const ContactAge = ({ form }) => {
    const [contactAgeRange, setContactAgeRange] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSlider, setShowSlider] = useState(false);

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/contact_age/values');
            const ages = response.data;
            const minValue = Math.min(...ages);
            const maxValue = Math.max(...ages);
            const minMaxValues = [minValue, maxValue];
            setContactAgeRange(minMaxValues);
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
            <Checkbox onChange={handleCheckboxChange}>Contact age Filter</Checkbox>
        </Form.Item>
        {showSlider && (
            <>
            <Form.Item label="Contact age" name="contact_age">
                {loading ? (
                <Spin />
                ) : (
                <Slider
                    range
                    draggableTrack
                    defaultValue={contactAgeRange}
                    min={contactAgeRange[0]}
                    max={contactAgeRange[1]}
                />
                )}
            </Form.Item>
            </>
        )}
        </>
    );
};

export default ContactAge;