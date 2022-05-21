import { useEffect, useState } from "react";
import axios from "../api/axios";

function Dashboard() {
  const [users, setUsers] = useState("");

  async function getUsers() {
    const response = await axios("/users", {
      method: "GET",
      withCredentials: true,
    });
    console.log(response.data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return <div>{users}</div>;
}
export default Dashboard;
