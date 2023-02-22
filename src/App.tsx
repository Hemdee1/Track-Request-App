import { Routes, Route } from "react-router-dom";
import "./global.css";
import "./tailwind.css";
import {
  EditProfile,
  HomePage,
  NewRequest,
  PlayedRequest,
  Profile,
  QueuedRequest,
  TestingAPI,
  UnavailableRequest,
} from "./pages";
import "./global.css";
import "./tailwind.css";
import { DashboardLayout, HomepageLayout } from "./components";
import Clubpage from "./pages/Clubpage";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomepageLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/new" element={<NewRequest />} />
          <Route path="/dashboard/queued" element={<QueuedRequest />} />
        <Route path="/cp/:clubid" element={<Clubpage />} />
          <Route path="/dashboard/played" element={<PlayedRequest />} />
          <Route
            path="/dashboard/unavailable"
            element={<UnavailableRequest />}
          />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        {/* <Route path="/test" element={<TestingAPI />} /> */}
      <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
