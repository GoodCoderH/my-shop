import { useEffect, useState } from "react";
import axios from "../api/axios";

function Dashboard() {
  const [users, setUsers] = useState("");

  async function getUsers() {
    await axios.get("/users").then((res) => {
      setUsers(res.data);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return <div>{users}</div>;
}
export default Dashboard;
