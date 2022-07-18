import axios from "../api/axios";

const onSilentRefresh = async () => {
  const response = await axios.get("/auth/reissue");

  return response.data.accessToken;
};

export default onSilentRefresh;
