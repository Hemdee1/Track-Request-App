import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../NavBar/Navbar";

const HomepageLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomepageLayout;
