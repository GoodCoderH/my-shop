import axios from "../api/axios";

const onSilentRefresh = async () => {
  await axios.get("/auth/reissue").then((res) => console.log(res.data));
};

export default onSilentRefresh;
