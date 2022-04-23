import { useEffect, useState } from "react";
import customAxios from "../api/customAxios";

function Home() {
  const [testStr, setTestStr] = useState("");

  useEffect(() => {
    connect();
  }, []);

  async function connect() {
    await customAxios.get("/home").then((res) => setTestStr(res.data));
  }

  return <div>{testStr}</div>;
}

export default Home;
