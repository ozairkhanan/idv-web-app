import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL || 'https://api.example.com';

const axiosInstance = axios.create({
  baseURL: apiURL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (axiosConfig) => {
    axiosConfig.headers["Content-Type"] = "application/json";
    return axiosConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*
  Response Interceptor
  Responsibilities:
  1- If api sends 401 token then send user to login page
*/
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // if auth
    // if (get(error, "response.status", "") === 401) {
    //   // reload will take user to Login page.
    //   setSession(null, null);
    //   window.location.reload();
    // } else {
    return Promise.reject(error);
    // }
  }
);

export default axiosInstance;
