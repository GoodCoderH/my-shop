import { useEffect, useState } from "react";
import axios from "../api/axios";

const Users = () => {
  const [ok, setOk] = useState();

  const test = async () => {
    try {
      const response = await axios.get("/user/admin");
      console.log(response.data);
      setOk(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    test();
  }, []);

  return <div>{ok}</div>;
};
export default Users;
