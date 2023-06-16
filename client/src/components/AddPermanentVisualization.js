import { Button, Form } from 'antd';
import { useParams } from 'react-router-dom';
/* Visualization form field parameters related compoenents */
import ChartTypeInput from './ChartTypeInput';
import DimensionInput from './DimensionInput';
import VisualizationTitleInput from './VisualizationTitleInput';
import VisualizationDescriptionInput from './VisualizationDescriptionInput';
import PostcodeInput from './PostcodeInput';
import AgeInput from './AgeInput';
import YearDeathInput from './YearOfDeathInput';
import GenderInput from './GenderInput';
import EthnicityInput from './EthnicityInput';
import ContactSourceInput from './ContactSourceInput';
import ContactDateInput from './ContactDateInput';
import ContactAge from './ContactAgeInput';
import ContactRouteInput from './ContactRouteInput';
import ContactReasonInput from './ContactReasonInput';
import ContactOutcomeInput from './ContactOutcome';
import VisitOccurenceInput from './VisitOccurenceInput';
import MonthsBetweenContactAndVisitInput from './MonthsBetweenContactAndVisit';

import {append} from '../utils/localStorage'
import { convertInputValues } from '../utils/QueryEngineInput';
import { useDispatch, useSelector } from 'react-redux';
// import { appendTemporaryVisualization } from '../features/visualization/visualizationSlice';
/* Layout used */
import { appendCurrentVisualization, removeCurrentVisualization } from '../features/db-posts/postsSlice'
const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};

const AddPermanentVisualization = () => {
    /******************************************* */
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {post_id} = useParams();
    const mode = useSelector((state) => state.user.mode);
    const currentVisualizations = useSelector((state) => state.dbPosts.currentPost?.visualizations);
    /******************************************* */
    const onFinish = (values) => {
        // Convert input values to the desired string format
        const { type, title, description, dimension, parameters } = convertInputValues(values);
        const visualization = {
            type,
            title,
            description,
            dimension,
            parameters
        }
        dispatch(appendCurrentVisualization(visualization));
    };
    return (
        <>
            <h4>Visualization parameters</h4>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item>
                    <Button type="primary" block htmlType="submit">
                        Add visualization
                    </Button>
                </Form.Item>
                {/* chart type input */}
                <ChartTypeInput />
                {/* dimension input */}
                <DimensionInput />
                {/* visualization title */}
                <VisualizationTitleInput />
                {/* visualization description */}
                <VisualizationDescriptionInput />
                <h4>Visualization filters</h4>
                {/* postcode input */}
                <PostcodeInput />
                {/* age input */}
                <AgeInput form={form}/>
                {/* year of death input */}
                <YearDeathInput/>
                {/* gender input */}
                <GenderInput/>
                {/* ethnicity input */}
                <EthnicityInput/>
                {/* contact source input */}
                <ContactSourceInput/>
                {/* contact date input */}
                <ContactDateInput/>
                {/* contact age input */}
                <ContactAge form={form}/>
                {/* contact route input */}
                <ContactRouteInput/>
                {/* contact reason input */}
                <ContactReasonInput/>
                {/* contact outcome input */}
                <ContactOutcomeInput/>
                {/* visit description input => To be added in the final Looker dashboard */}
                {/* visit occurence input */}
                <VisitOccurenceInput/>
                {/* months between contac and visit input */}
                <MonthsBetweenContactAndVisitInput/>
                
            </Form>
        </>
        
    );
};

export default AddPermanentVisualization;
