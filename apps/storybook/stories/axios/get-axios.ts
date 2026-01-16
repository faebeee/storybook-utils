import axios from 'axios';

const axiosInstance = axios.create();

export const getAxios = () => axiosInstance;
