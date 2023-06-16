import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';

export const fetchVisualizationData = createAsyncThunk(
    'visualizationData/fetchVisualizationData',
    async (visualization) => {
        const response = await customFetch.post('/visualization/data', visualization);
        const { data: responseData, labels } = response.data;
        const adaptedChartData = labels.map((label, index) => [label, responseData[index]]);
        return [['Dimension', 'Head Count'], ...adaptedChartData];
    }
);

const visualizationDataSlice = createSlice({
    name: 'visualizationData',
    initialState: { data: {}, isLoading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchVisualizationData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchVisualizationData.fulfilled, (state, action) => {
            const { id, chartData } = action.payload;
            state.data[id] = chartData;
            state.isLoading = false;
        })
        .addCase(fetchVisualizationData.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export default visualizationDataSlice.reducer;