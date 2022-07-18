import { Route, Routes } from "react-router-dom";
import "./App.css";
import Delivery from "./routes/Delivery";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Products from "./routes/Products";
import Signup from "./routes/Signup";
import Test from "./routes/Test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:name" element={<Detail />} />
      <Route path="/test" element={<Test />} />
      <Route path="/delivery" element={<Delivery />} />
    </Routes>
  );
}

export default App;
