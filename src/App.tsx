import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import './global.css';
import './tailwind.css';
import Navbar from './components/NavBar/Navbar';
import Footer from "./components/Footer";

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
