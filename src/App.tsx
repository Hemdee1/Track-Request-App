import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import './global.css';
import './tailwind.css';
import Navbar from './components/NavBar/Navbar';
import Footer from "./components/Footer";
import { Dashboard, Home, TestingAPI } from "./pages";

function App() {
  return (
    <>
    <Navbar />
    <div className="font-Inter">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<TestingAPI />} />
      </Routes>
    <Footer />
    </>
    </div>
  );
}

export default App;
