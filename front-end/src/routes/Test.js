import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Test = () => {
  const [ok, setOk] = useState();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const test = async () => {
    try {
      const response = await axiosPrivate.get("/user/admin");
      console.log(response.data);
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
