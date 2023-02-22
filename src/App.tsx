import { Routes, Route } from "react-router-dom";
import {
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cp/:clubid" element={<Clubpage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/new" element={<NewRequest />} />
          <Route path="/dashboard/queued" element={<QueuedRequest />} />
          <Route path="/dashboard/played" element={<PlayedRequest />} />
          <Route
            path="/dashboard/unavailable"
            element={<UnavailableRequest />}
          />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
       
      </Routes>
    </>
  );
}

export default App;
