import axios from "../api/axios";
import { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [navigate, setNavigate] = useState(false);

  async function onSubmit(data) {
    await axios.post("/login", data).then((res) => {
      console.log(res.data);
      setNavigate(true);
    });
  }

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white w-96 p-6 rounded shadow-sm">
          <div className="flex items-center flex-col justify-center mb-4">
            <h1 className="my-shop text-3xl">MY-SHOP</h1>
            {errors.username && <span role="alert">Username is required</span>}
            {errors.password && <span role="alert">Password is required</span>}
          </div>
          <label className="text-gray-700 text-xl">Username</label>
          <input
            id="username"
            type="text"
            aria-invalid={errors.username ? "true" : "false"}
            {...register("username", { required: true })}
            className="w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
          />
          <label className="text-gray-700 text-xl">Password</label>
          <input
            type="password"
            aria-invalid={errors.password ? "true" : "false"}
            {...register("password", { required: true })}
            className="w-full py-2 bg-gray-100 text-gray-500 px-1 outline-none mb-4"
          />
          <input id="remember" className="mb-6" type="checkbox" />
          <label htmlFor="remember" className="text-gray-700 text-lg">
            Remember me
          </label>

          <button
            type="submit"
            className="bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}

export default SignIn;
