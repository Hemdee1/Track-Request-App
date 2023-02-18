import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import TestingAPI from "./pages/TestingAPI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<TestingAPI />} />
    </Routes>
  );
}

export default App;
