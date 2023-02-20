import { Routes, Route } from "react-router-dom";
import "./global.css";
import "./tailwind.css";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer";
import { Dashboard, Home, TestingAPI } from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<TestingAPI />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
