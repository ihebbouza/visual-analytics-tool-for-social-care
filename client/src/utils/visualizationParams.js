import customFetch from "./axios";

export const datasetLabels = async () => {
    try {
        const resp = await customFetch.get('/dataset/labels');
        console.log(resp.data)
        console.log('hello')
        return resp.data;
    } catch(error) {
        console.log(error);
    }
};
