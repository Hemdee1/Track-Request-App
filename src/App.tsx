import { Routes, Route } from "react-router-dom";
import {
  About,
  EditProfile,
  HomePage,
  NewRequest,
  PlayedRequest,
  Profile,
  QueuedRequest,
  Register,
  TestingAPI,
  UnavailableRequest,
} from "./pages";
import "./global.css";
import { DashboardLayout, HomepageLayout } from "./components";
import Clubpage from "./pages/Clubpage";
import Login from "./pages/Login";
import AnimatedBackground from "./components/AnimatedBackground";

function App() {
  return (
    <div className="bg-white text-black dark:bg-[black] dark:text-white">
      {/* <AnimatedBackground /> */}
      <Routes>
        <Route element={<HomepageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/cp/:id" element={<Clubpage />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/test" element={<TestingAPI />} />
      </Routes>
    </div>
  );
}

export default App;
