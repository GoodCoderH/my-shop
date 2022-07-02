import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Delivery from "./routes/Delivery";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Products from "./routes/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:name" element={<Detail />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
