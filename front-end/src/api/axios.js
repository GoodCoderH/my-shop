import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:8080/auth",
// });

axios.defaults.baseURL = "http://localhost:8080/auth";

export default axios;
