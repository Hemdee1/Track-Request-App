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
          <Route path="/dashboard/played" element={<PlayedRequest />} />
          <Route
            path="/dashboard/unavailable"
            element={<UnavailableRequest />}
          />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/test" element={<TestingAPI />} /> */}
      </Routes>
    </>
  );
}

export default App;
