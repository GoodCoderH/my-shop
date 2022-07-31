import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/auth/reissue", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data };
    });
    console.log({ setAuth });
    return response.data;
  };

  return refresh;
};
export default useRefreshToken;
