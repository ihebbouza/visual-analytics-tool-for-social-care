/***********************Components imports********************************/
import { Button, Form } from 'antd';
import ChartTypeInput from '../ChartTypeInput';
import DimensionInput from '../DimensionInput';
import VisualizationTitleInput from '../VisualizationTitleInput';
import VisualizationDescriptionInput from '../VisualizationDescriptionInput';
import PostcodeInput from '../PostcodeInput';
import AgeInput from '../AgeInput';
import YearDeathInput from '../YearOfDeathInput';
import GenderInput from '../GenderInput';
import EthnicityInput from '../EthnicityInput';
import ContactSourceInput from '../ContactSourceInput';
import ContactDateInput from '../ContactDateInput';
import ContactAge from '../ContactAgeInput';
import ContactRouteInput from '../ContactRouteInput';
import ContactReasonInput from '../ContactReasonInput';
import ContactOutcomeInput from '../ContactOutcome';
import VisitOccurenceInput from '../VisitOccurenceInput';
import VisitDecription from '../VisitDescriptionInput'
import MonthsBetweenContactAndVisitInput from '../MonthsBetweenContactAndVisit';
import styled from 'styled-components';
/***********************React imports*************************************/
import { useDispatch, useSelector } from 'react-redux';
/***********************Slices imports************************************/
import { appendCreatePostVisualization } from '../../features/createPost/createPostSlice'
import { appendEditPostVisualization } from '../../features/editPost/editPostSlice';
/***********************Utils imports*************************************/
import { convertInputValues } from '../../utils/QueryEngineInput'


/******* layout: Visualization Parameters Form  ******** */
const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const StyledWrapper = styled.div`
    border: 1px solid #ccc;
    padding: 16px;
`;

const FinalAddVisualization = () => {
    /***************** Setup ********************** */
    const [form] = Form.useForm() // antd
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.user.mode)
    /****************** event handlers ******************* */
    const addVisualization = (values) => {
        const { type, title, description, dimension, parameters } = convertInputValues(values);
        const visualization = {
            type,
            title,
            description,
            dimension,
            parameters
        }
        console.log('Visualization to add: ', visualization)
        if (mode === 'create') {
            dispatch(appendCreatePostVisualization(visualization))
        }
        else if (mode === 'edit') {
            dispatch(appendEditPostVisualization(visualization))
        }
    }

    return (
        <StyledWrapper>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={addVisualization}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item>
                    <Button type="default" block htmlType="submit">
                        <strong>Add visualization</strong>
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
                <VisitDecription/>
                {/* visit occurence input */}
                <VisitOccurenceInput/>
                {/* months between contac and visit input */}
                <MonthsBetweenContactAndVisitInput/>
            </Form>
        </StyledWrapper>
    )
}

export default FinalAddVisualization;