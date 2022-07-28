import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Test = () => {
  const [ok, setOk] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const test = async () => {
    const response = await axiosPrivate
      .get("/user/admin")
      .catch(function (error) {
        if (error.response.status === 403) {
          window.location.replace("/");
        } else if (error.response.status != 401) {
          window.location.replace("/login");
        }
      });

    setOk(response.data);
    setLoading(false);
  };

  useEffect(() => {
    test();
  }, []);

  return <div>{loading ? "load.." : <div>{ok}</div>}</div>;
};
export default Test;
