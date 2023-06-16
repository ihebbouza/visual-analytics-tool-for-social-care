import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardFooter } from 'mdb-react-ui-kit';
import { Button, Modal, Form, Input } from 'antd';
import  VisualizationTitleInput  from './VisualizationTitleInput'
import  VisualizationDescriptionInput  from './VisualizationDescriptionInput';
import { Chart } from 'react-google-charts';
import { Spin } from 'antd';
import customFetch from '../utils/axios';
// localVisaulizationsSlice
import { updateTemporaryVisualization, removeTemporaryVisualization } from '../features/local-storage-visualizations/localStorageVisualizationsSlice'; 
import { removeCurrentVisualization } from '../features/db-posts/postsSlice'; 

// local storage:
import {getEditMode, getViewMode} from '../utils/localStorage'

const Visualization = ({data, onDelete}) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.user.mode);
    const [chartData, setChartData] = useState(null);
    const { type, title, description, dimension } = data;
    // fetching the data from the Dataset
    useEffect(() => {
        const fetchData = async () => {
            const response = await customFetch.post('/visualization/data', data);
            const { data: responseData, labels } = response.data;
            const adaptedChartData = labels.map((label, index) => [label, responseData[index]]);
            setChartData([['Dimension', 'Head Count'], ...adaptedChartData]);
        };
        fetchData();
    }, [data]);

    // deleting a visualization
    const handleDelete = () => {
        /*** Check if the edit post mode is on ***/
        if (mode === 'add') {
            /* Local action * */
            dispatch(removeTemporaryVisualization(data.index));
        } 
        
        else if (mode === 'edit') {
            /* DB action * */
            dispatch(removeCurrentVisualization(data));
        }
    };

    // updating visualization title and description
    const handleUpdate = () => {
        dispatch(updateTemporaryVisualization(data.index, "new", "new"));
    }

    const renderChart = () => {
        if (type === 'bar chart') {
            return (
                <Chart
                    chartType='BarChart'
                    width='100%'
                    height='400px'
                    data={chartData}
                    options={{
                        chartArea: { width: '50%' },
                        hAxis: {
                            title: 'Head count',
                            minValue: 0,
                        },
                        vAxis: {
                            title: dimension,
                        },
                    }}
                />
            );
        } else if (type === 'pie chart') {
            return (
                <Chart
                    options={{
                        title: {dimension}
                    }}
                    chartType='PieChart'
                    width='100%'
                    height='400px'
                    data={chartData}
                />
            );
        }
    };

    return (
        <MDBCard alignment='center'>
            <MDBCardHeader>
                <h2>{title}</h2>
            </MDBCardHeader>
            <MDBCardBody>
                {chartData ? (
                    renderChart()
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                <p class="card-text">{description}</p>
            </MDBCardBody>
            <MDBCardFooter>
                {(mode === 'edit' || mode === 'add') && (<MDBBtn color="danger" size="sm" onClick={handleDelete}>Delete</MDBBtn>)}
            </MDBCardFooter>
            {/******** Modal: Update visualization *********/}
        </MDBCard>
    );
};

export default Visualization;