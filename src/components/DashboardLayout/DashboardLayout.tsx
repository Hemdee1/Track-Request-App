import { NavLink, Outlet } from "react-router-dom";
import Header from "../Header";

import { GoArrowRight, GoArrowLeft } from "react-icons/go";

const DashboardLayout = () => {
  return (
    <section>
      <div className="fixed w-full left-0 top-0">
        <Header />
        <div className="w-full h-[82px] relative">
          <GoArrowLeft className="absolute left-0 text-white top-7 text-xl select-none md:hidden" />
          <GoArrowRight className="absolute right-0 text-white top-7 text-xl select-none md:hidden" />

          <div className="w-full h-full bg-[#61818E] overflow-x-scroll lg:overflow-hidden scroll">
            <div className="h-full w-[720px] mx-auto flex items-center justify-center gap-8 ">
              <NavLink
                to="/dashboard/new"
                className={({ isActive }) =>
                  `w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                    isActive
                      ? "text-[#61818E] bg-white"
                      : "bg-transparent text-white"
                  }`
                }
              >
                New Request
              </NavLink>
              <NavLink
                to="/dashboard/queued"
                className={({ isActive }) =>
                  `w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                    isActive
                      ? "text-[#61818E] bg-white"
                      : "bg-transparent text-white"
                  }`
                }
              >
                Queued
              </NavLink>
              <NavLink
                to="/dashboard/unavailable"
                className={({ isActive }) =>
                  `w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                    isActive
                      ? "text-[#61818E] bg-white"
                      : "bg-transparent text-white"
                  }`
                }
              >
                Unavailable
              </NavLink>
              <NavLink
                to="/dashboard/played"
                className={({ isActive }) =>
                  `w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                    isActive
                      ? "text-[#61818E] bg-white"
                      : "bg-transparent text-white"
                  }`
                }
              >
                Played
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[162px]">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
