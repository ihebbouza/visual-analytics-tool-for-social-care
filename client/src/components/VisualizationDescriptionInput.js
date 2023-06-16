import { Form} from 'antd';
import { Input, Tex } from 'antd';
const { TextArea } = Input;

const VisualizationDescriptionInput = () => {
    return (
        <>
            <Form.Item
                name="description"
                label="description"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <TextArea
                    showCount
                    maxLength={600}
                    style={{ height: 120, marginBottom: 24 }}
                    placeholder="can resize"
                />
            </Form.Item>
        </>
    );
}

export default VisualizationDescriptionInput;