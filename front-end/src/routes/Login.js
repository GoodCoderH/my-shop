import axios from "../api/axios";
import { useState, useContext, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        { username: user, password: pwd },
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth(user, pwd, roles, accessToken);
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
    }

    errRef.current.focus();
  };

  return (
    <>
      {success ? (
        <Navigate to="/" />
      ) : (
        <main className="flex items-center justify-center h-screen bg-gray-100">
          <form onSubmit={handleSubmit}>
            <div className="bg-white w-96 p-6 rounded shadow-sm">
              <div className="flex items-center flex-col justify-center mb-4">
                <img src="/images/SHOV.png" alt="logo" />
              </div>
              <p ref={errRef} className="text-red-700" aria-live="assertive">
                {errMsg}
              </p>
              <label htmlFor="username" className="text-gray-700 text-xl">
                Username
              </label>
              <input
                id="username"
                type="text"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                className="w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
              />
              <label htmlFor="password" className="text-gray-700 text-xl">
                Password
              </label>
              <input
                id="password"
                type="password"
                ref={userRef}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                className="w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
              />

              <button
                type="submit"
                className="bg-white w-full border border-main text-main py-2 rounded hover:bg-main hover:text-white transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </main>
      )}
    </>
  );
};

export default Login;
