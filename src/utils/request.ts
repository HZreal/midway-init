// axios请求
import axios from 'axios';

export const axiosGet = async (url, params) => {
    let response;
    try {
        response = await axios.get(url, { params: params });
    } catch (err) {
        console.error('error in remote axios request ---->  ', err);
    }
    return response.data;
};

export const axiosPost = async (url, params) => {
    let response;
    try {
        response = await axios.post(url, { params: params });
    } catch (err) {
        console.error('error in remote axios request ---->  ', err);
    }
    return response.data;
};
