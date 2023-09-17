import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:44470/api', // Take from ENV
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      'Content-Language': 'en',
    },
  });

  export default axiosInstance;