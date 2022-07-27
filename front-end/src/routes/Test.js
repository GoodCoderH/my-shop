import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Test = () => {
  const [ok, setOk] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const test = async () => {
    try {
      const response = await axiosPrivate
        .get("/user/admin")
        .catch((err) =>
          !err.response.status === 401 || !err.response.status === 403
            ? window.location.replace("/login")
            : console.log(response.data)
        );

      setOk(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    test();
  }, []);

  return <div>{loading ? "load.." : <div>{ok}</div>}</div>;
};
export default Test;
