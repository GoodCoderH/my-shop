import { useEffect } from "react";
import axios from "../api/axios";

const Test = () => {
  useEffect(() => {
    axios.get("/refreshToken", { withCredentials: true });
  }, []);
};

export default Test;
