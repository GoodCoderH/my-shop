import axios from "../api/axios";

const Logout = () => {
  axios.get("/auth/logout").finally(window.location.replace("/"));
};

export default Logout;
