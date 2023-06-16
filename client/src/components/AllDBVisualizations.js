import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Visualization from './Visualization';

import { getPostVisualizations } from '../features/db-posts/postsSlice';

const VisualizationGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`;

const AllDbVisualizations = () => {
    const dispatch = useDispatch();
    const [visualizationsUpdated, setVisualizationsUpdated] = useState(false);
    const { post_id } = useParams();
    const currentVisualizations = useSelector((state) => state.dbPosts.currentPost?.visualizations);
    const currentPostVisualizationsIsNull = currentVisualizations == null;
    const mode = useSelector((state) => state.user?.mode); // edit or view

    useEffect(() => {
        // Fetch post visualizations
        dispatch(getPostVisualizations(post_id));
    }, [dispatch, post_id]);

    useEffect(() => {
        setVisualizationsUpdated(!visualizationsUpdated);
    }, [currentVisualizations]);
    /* Handling delete operation in the callback ** */
    /***** */
    return (
        <>
            { mode === 'view' && (
                <>
                    <VisualizationGrid>
                        {currentPostVisualizationsIsNull ? (
                            <>
                                <Spin tip="Loading visualizations in view mode..."/> {/* Replace the <h1> element with the Spin component */}
                            </>
                        ) : (
                            <>
                            {currentVisualizations.map((visualization) => (
                                <Visualization 
                                    key={visualization.id}
                                    data={visualization} 
                                />
                            ))}
                            </>
                        )}
                    </VisualizationGrid>
                </>
            )}
            { mode === 'edit' && (
                <>
                    <VisualizationGrid>
                        {currentPostVisualizationsIsNull ? (
                            <>
                                <Spin tip="Loading visualizations in edit mode..."/>
                            </>
                        ) : (
                            <>
                            {currentVisualizations.map((visualization) => (
                                <Visualization 
                                    key={visualization.id || visualization.index}
                                    data={visualization} 
                                />
                            ))}
                            </>
                        )}
                    </VisualizationGrid>
                </>
            )}

            
        </>
    );
};

export default AllDbVisualizations;