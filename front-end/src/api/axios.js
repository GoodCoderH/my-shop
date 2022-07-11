import axios from "axios";
const BASE_URL = "http://localhost:8080";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (request) => {
    if (request.headers.common.Authorization === undefined) {
      console.log(request.headers.common.Authorization);
    }
    return request;
  },
  (error) => console.log(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => console.log(error)
);
export default instance;
