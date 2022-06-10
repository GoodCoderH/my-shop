import axios from "../api/axios";

export const refreshToken = async (callback) => {
  await axios
    .get("/auth/refreshToken", { withCredentials: true })
    .then((res) => {
      console.log(res.data);
    });
};

export default refreshToken;
