import { Form} from 'antd';
import { Input } from 'antd';
const { TextArea } = Input;

const VisualizationTitleInput = () => {
    return (
        <>
            <Form.Item
                name="title"
                label="title"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Input showCount maxLength={60} />
            </Form.Item>
        </>
    );
}

export default VisualizationTitleInput;