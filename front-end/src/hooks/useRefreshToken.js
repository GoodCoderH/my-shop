import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/reissue", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(prev);
      console.log(response.data);
      return { ...prev, accessToken: response.data };
    });
    return response.data.accessToken;
  };

  return refresh;
};
export default useRefreshToken;
