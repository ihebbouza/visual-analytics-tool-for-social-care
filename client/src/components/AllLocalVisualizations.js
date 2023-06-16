import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Visualization from './Visualization';

import { removeTemporaryVisualization } from '../features/local-storage-visualizations/localStorageVisualizationsSlice';
const VisualizationGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`;

const AllLocalVisualizations = () => {
    const dispatch = useDispatch();
    const localVisualizations = useSelector((state) => state.localStorageVisualizations.localVisualizations);

    return (
        <>
            <VisualizationGrid>
                {localVisualizations.map((visualization) => (
                    <Visualization key={visualization.index} data={visualization} />
                ))}
            </VisualizationGrid>
        </>
    );
};

export default AllLocalVisualizations;