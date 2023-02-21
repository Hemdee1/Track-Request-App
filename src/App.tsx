import { Routes, Route } from "react-router-dom";
import { Home, Register, TestingAPI } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<TestingAPI />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
