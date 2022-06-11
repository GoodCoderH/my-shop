import axios from "../api/axios";

export const refreshToken = async () => {
  await axios
    .get("/auth/refreshToken", { withCredentials: true })
    .then((res) => {
      const token = res.data;
      console.log(token);
      refreshSuccess(token);
      return token;
    })
    .catch(console.log("Login please"));
};

const refreshSuccess = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default refreshToken;
