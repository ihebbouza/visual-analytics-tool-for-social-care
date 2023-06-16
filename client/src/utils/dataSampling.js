const MAX_DATA_POINTS = 10;
export const performDataSampling = async (response) => {
     // Set the maximum number of data points you want to display
    if (response.data.length <= MAX_DATA_POINTS) {
        return response;
    }
    const sampledData = response.data.slice(0, MAX_DATA_POINTS).map((value, index) => {
        return {
            label: response.labels[index],
            value: value,
        };
    });
    return {
        labels: sampledData.map((item) => item.label),
        data: sampledData.map((item) => item.value),
    };
};