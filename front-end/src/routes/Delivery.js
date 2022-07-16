import { useEffect } from "react";
import axios from "../api/axios";
import onSilentRefresh from "../utils/refresh";

const Delivery = () => {
  const checkHeader = async () => {
    await axios.get("/auth");
  };

  useEffect(() => {
    onSilentRefresh();
    checkHeader();
  }, []);
};
export default Delivery;
