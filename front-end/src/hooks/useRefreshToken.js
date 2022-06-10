import axios from "../api/axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/auth/refreshToken", {
      withCredentials: true,
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
