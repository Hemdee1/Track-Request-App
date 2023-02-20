import { Routes, Route } from "react-router-dom";
import "./global.css";
import "./tailwind.css";
import { Dashboard, Home, TestingAPI } from "./pages";
import "./global.css";
import "./tailwind.css";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer";
import HomePage from './pages/Homepage/Homepage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" element={<Home />} /> */}
      <Route path="/test" element={<TestingAPI />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
