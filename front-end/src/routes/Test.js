import { useEffect } from "react";
import axios from "../api/axios";

function Test() {
  useEffect(() => {
    axios.get("/refreshToken", { withCredentials: true });
  }, []);
}

export default Test;
