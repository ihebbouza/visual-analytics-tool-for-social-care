/***********************Components imports********************************/
import FinalVisualization from '../FinalVisualizationComponent/FinalVisualization';
import { Spin } from 'antd';
/***********************React imports*************************************/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'; // for CSS styling
/***********************Slices imports************************************/
/***********************Utils imports*************************************/


/**************** styling: CSS ******************** */
const VisualizationGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    border: 1px solid #ccc; // Add a thin border
    padding: 16px; // Add padding to create space
`;
const CenteredText = styled.h4`
    text-align: center;
    grid-column: span 2;
    font-size: 20px;
`;
const CenteredSpin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    grid-column: span 2;
`;

const FinalVisualizationList = () => {
    /************* Setup ********************* */
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.user.mode) // keep track of mode ('view' // 'edit' // 'create')

    // create mode
    const createVisualizationList = useSelector((state) => state.createPost.postToCreate?.visualizations) || [];
    const createVisualizationListIsEmpty = createVisualizationList.length === 0;

    // view mode
    const viewVisualizationList = useSelector((state) => state.viewPost.postVisualizations);
    const viewVisualizationListIsEmpty = viewVisualizationList.length === 0;
    
    // edit mode
    const editVisualizationList = useSelector((state) => state.editPost.postInEditing?.visualizations) || [];
    const editVisualizationListIsEmpty = editVisualizationList.length === 0;
    // reload on updates on visualizations
    /************** UseEffect ***************** */
    return (
        <>
            { 
                mode === 'create' && 
                (
                    <>
                        <VisualizationGrid>
                            {createVisualizationListIsEmpty ? (
                                <>
                                    <CenteredSpin>
                                        <Spin size="large" tip="loading visualizations..." />
                                    </CenteredSpin>
                                </>
                            ) : (
                                <>
                                {createVisualizationList.map((visualization) => (
                                    <FinalVisualization 
                                        key={visualization.index}
                                        data={visualization} 
                                    />
                                ))}
                                </>
                            )}
                        </VisualizationGrid>
                    </>
                )
            }
            { 
                mode === 'view' && 
                (
                    <>
                        <VisualizationGrid>
                            {viewVisualizationListIsEmpty ? (
                                <>
                                    <CenteredSpin>
                                        <Spin size="large" tip="loading visualizations..." />
                                    </CenteredSpin>
                                </>
                            ) : (
                                <>
                                {viewVisualizationList.map((visualization) => (
                                    <FinalVisualization 
                                        key={visualization.id}
                                        data={visualization} 
                                    />
                                ))}
                                </>
                            )}
                        </VisualizationGrid>
                    </>
                )
            }
            { 
                mode === 'edit' && 
                (
                    <>
                        <VisualizationGrid>
                            {editVisualizationListIsEmpty ? (
                                <>
                                    <CenteredSpin>
                                        <Spin size="large" tip="loading visualizations..." />
                                    </CenteredSpin>
                                </>
                            ) : (
                                <>
                                {editVisualizationList.map((visualization) => (
                                    <FinalVisualization 
                                        key={visualization.index_edit}
                                        data={visualization} 
                                    />
                                ))}
                                </>
                            )}
                        </VisualizationGrid>
                    </>
                )
            }
        </>
    )
}

export default FinalVisualizationList;