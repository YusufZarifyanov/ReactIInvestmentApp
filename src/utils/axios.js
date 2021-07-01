import axios from "axios";

export const v1Axios = axios.create({
  baseURL: `https://${process.env.REACT_APP_V1_HOST}`,
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_V1_API_KEY,
    "x-rapidapi-host": process.env.REACT_APP_V1_HOST,
    useQueryString: true,
  },
});

export const lowLatencyAxios = axios.create({
  baseURL: `https://${process.env.REACT_APP_LOW_LATENCY_HOST}`,
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_LOW_LATENCY_API_KEY,
    "x-rapidapi-host": process.env.REACT_APP_LOW_LATENCY_HOST,
    useQueryString: true,
  },
});