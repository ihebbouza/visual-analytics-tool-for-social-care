import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

const chartOptions = ['bar chart', 'pie chart'];

const ChartTypeInput = () => {
    return (
        <>
            <Form.Item
                name="type"
                label="Chart type"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Select
                    placeholder="Select a chart type"
                    allowClear
                >
                    {
                        chartOptions.map((option) => (
                            <Option key={option} value={option}>
                            {option}
                            </Option>
                        ))
                    }
                </Select>
            </Form.Item>
        </>
    );
}

export default ChartTypeInput;