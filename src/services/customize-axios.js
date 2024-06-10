import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in",
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const statusCode = error.response.status;
    if (statusCode === 404) {
      return statusCode;
    } else if (statusCode === 500) {
      return statusCode;
    } else {
      return error.message;
    }
  }
);

export default instance;
