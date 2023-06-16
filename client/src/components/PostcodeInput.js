import { Button, Form, Input, Select, Space, Spin, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import customFetch from '../utils/axios';

const { Option } = Select;

const PostcodeInput = () => {
    const [postcodes, setPostcodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showSelect, setShowSelect] = useState(false);
    const filteredOptions = postcodes.filter((o) => !selectedItems.includes(o));

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await customFetch.get('/dataset/postcode/values');
            setPostcodes(response.data);
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
            <Checkbox onChange={handleCheckboxChange}>Postcode Filter</Checkbox>
        </Form.Item>
        {showSelect && (
            <Form.Item
            name="postcode"
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
                placeholder="Selected postcodes are removed from the list"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                    width: '100%',
                }}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
                />
            )}
            </Form.Item>
        )}
        </>
    );
};

export default PostcodeInput;