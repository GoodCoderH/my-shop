function LoginForm() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form>
        <div className="bg-white w-96 p-6 rounded shadow-sm">
          <div className="flex items-center justify-center mb-4">
            <h1 className="my-shop text-3xl">MY-SHOP</h1>
          </div>
          <label className="text-gray-700 text-xl">Username</label>
          <input
            type="text"
            className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
          />
          <label className="text-gray-700 text-xl">Password</label>
          <input
            type="password"
            className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
          />
          <input id="remember" className="mb-6" type="checkbox" />
          <label for="remember" className="text-gray-700 text-lg">
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
export default LoginForm;
