import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./routes/Admin";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Test from "./routes/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
