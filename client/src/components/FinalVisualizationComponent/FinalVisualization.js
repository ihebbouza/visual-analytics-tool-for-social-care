/***********************Components imports********************************/
import { Chart } from 'react-google-charts'; // charts
import { Spin } from 'antd'; // loading effect
import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardFooter } from 'mdb-react-ui-kit';
/***********************React imports*************************************/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/***********************Slices imports************************************/
import { deleteCreatePostVisualization } from '../../features/createPost/createPostSlice';  
import { deleteEditPostVisualization } from '../../features/editPost/editPostSlice';
/***********************Utils imports*************************************/
import customFetch  from '../../utils/axios';
import { performDataSampling } from '../../utils/dataSampling';


const FinalVisualization = ({ data }) => {
    /****** Setup ******* */
    console.log('---------------------------------------');
    console.log("data passed to the visualization: ", data);
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.user.mode);
    const [chartData, setChartData] = useState(null);
    const { type, title, description, dimension } = data;
    
    /******* UseEffect() **** */
    // featching visualization data
    useEffect(() => {
        const fetchData = async () => {
            const response = await customFetch.post('/visualization/data', data);
            
            const { data: responseData, labels } = await performDataSampling(response.data);
            const adaptedChartData = labels.map((label, index) => [label, responseData[index]]);
            setChartData([['Dimension', 'Head Count'], ...adaptedChartData]); 
        };
        fetchData();
    }, [data]);
    /****  Data sampling **** */
    /******** Event handlers ***** */
    const handleDelete = () => {
        if (mode === 'create') {
            dispatch(deleteCreatePostVisualization(data));
        }
        else if (mode === 'edit') {
            dispatch(deleteEditPostVisualization(data));
        }
    }

    /***** Rendering the chart ***** */
    const renderChart = () => {
        // Bar chart
        if (type === 'bar chart') 
        {
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
                            titleTextStyle: { fontSize: 18 },
                        },
                    }}
                />
            );
        } 
        // Pie chart
        else if (type === 'pie chart') 
        {
            return (
                <Chart
                    chartType='PieChart'
                    width='100%'
                    height='400px'
                    data={chartData}
                    options={{
                        title: dimension,
                        titleTextStyle: { fontSize: 18 },
                        chartArea: { width: '50%' },
                    }}
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
                {(mode === 'edit' || mode === 'create') && (<MDBBtn color="danger" size="sm" onClick={handleDelete}>Delete</MDBBtn>)}
            </MDBCardFooter>
            {/******** Modal: Update visualization *********/}
        </MDBCard>
    )
}

export default FinalVisualization;