import { Routes, Route } from "react-router-dom";
import { Home, TestingAPI } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<TestingAPI />} />
    </Routes>
  );
}

export default App;
