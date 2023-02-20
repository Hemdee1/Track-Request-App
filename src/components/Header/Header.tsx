import Hamburger from "hamburger-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import FullLogo from "../../assets/SVGs/FullLogo";
import LogoIcon from "../../assets/SVGs/LogoIcon";
import { GoInfo } from "react-icons/go";

const Header = () => {
  const [session, setSession] = useState(false);
  const img = true;

  const handleSession = () => {
    setSession((prev) => !prev);
  };

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full h-[80px] lg:h-[124px] flex items-center bg-white font-Inter">
      <div className="w-[1248px] max-w-full mx-auto justify-between items-center px-6 hidden lg:flex">
        <div className="flex gap-12">
          <Link to="/">
            <FullLogo />
          </Link>
          <NavLink
            to="/dashboard/new"
            className={({ isActive }) =>
              `rounded-[26px] w-[162px] h-[47px] grid place-items-center font-Inter font-medium ${
                isActive
                  ? "bg-[#61818E] text-white"
                  : "bg-transparent text-[#6B6B6B]"
              }`
            }
          >
            Track requests
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `rounded-[26px] w-[162px] h-[47px] grid place-items-center font-Inter font-medium ${
                isActive
                  ? "bg-[#61818E] text-white"
                  : "bg-transparent text-[#6B6B6B]"
              }`
            }
          >
            Public page
          </NavLink>
        </div>

        <div className="flex gap-[50px]">
          <span className="flex gap-3 items-center">
            <h5 className="text-[#6B6B6B] font-Inter font-medium">
              Session on
            </h5>
            <button
              className="w-[45px] h-[25px] bg-[#ECECEC] rounded-[27px] px-1"
              onClick={handleSession}
            >
              <span
                className={`h-5 w-5 rounded-[27px] block transition-all duration-500 ${
                  session
                    ? "translate-x-4 bg-[#35CA8B]"
                    : "translate-x-0 bg-gray-400"
                }`}
              ></span>
            </button>
          </span>

          <span className="flex gap-6 items-center">
            <h5 className="text-[#6B6B6B] font-Inter font-medium">
              DJ Hoolander
            </h5>
            {img ? (
              <img
                src="/user.png"
                alt="user"
                className="h-[54px] w-[54px] object-cover rounded-full"
              />
            ) : (
              <div className="h-[54px] w-[54px] bg-[#35CA8B] grid place-items-center font-semibold text-2xl text-white rounded-full">
                D
              </div>
            )}
          </span>
        </div>
      </div>

      {/* Mobile navigation */}
      <section className="lg:hidden flex items-center w-full h-full">
        <div className="mobile-menue-top w-full px-4 flex mx-auto items-center justify-between bg-white">
          <Link to="/" onClick={closeMenu}>
            <LogoIcon />
          </Link>

          <div className="mobile-cta flex items-center gap-2 ">
            <button
              className="w-[45px] h-[25px] mr-3 bg-[#ECECEC] rounded-[27px] px-1"
              onClick={handleSession}
            >
              <span
                className={`h-5 w-5 rounded-[27px] block transition-all duration-500 ${
                  session
                    ? "translate-x-4 bg-[#35CA8B]"
                    : "translate-x-0 bg-gray-400"
                }`}
              ></span>
            </button>

            {img ? (
              <img
                src="/user.png"
                alt="user"
                className="h-10 lg:h-[54px] w-10 lg:w-[54px] object-cover rounded-full"
              />
            ) : (
              <div className="h-10 lg:h-[54px] w-10 lg:w-[54px] bg-[#35CA8B] grid place-items-center font-semibold text-2xl text-white rounded-full">
                D
              </div>
            )}

            <span className="ml-3">
              <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </span>
          </div>
        </div>

        <div
          className={`fixed left-0 top-[80px] w-full bg-white ${
            isOpen
              ? "translate-x-[0%] h-[calc(100vh-100px)]"
              : "-translate-x-[100%] h-auto"
          }`}
        >
          <ul>
            <li className="w-full h-[80px]">
              <NavLink
                to="/dashboard/new"
                className={({ isActive }) =>
                  isActive
                    ? "h-full items-center bg-[var(--secondary-color)] text-slate-200 w-full flex px-7"
                    : "h-full items-center hover:bg-[var(--secondary-color)] hover:text-slate-200 w-full flex px-7"
                }
                onClick={closeMenu}
              >
                Track requests
              </NavLink>
            </li>

            <li className="w-full h-[80px]">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "h-full items-center bg-[var(--secondary-color)] text-slate-200 w-full flex px-7"
                    : "h-full items-center hover:bg-[var(--secondary-color)] hover:text-slate-200 w-full flex px-7"
                }
                onClick={closeMenu}
              >
                Public page
              </NavLink>
            </li>
          </ul>

          <p className="copyright text-slate-400 w-full text-center absolute bottom-10">
            © copyright mxrequest 2023
          </p>
        </div>
      </section>

      {/* NOTICE MODAL */}
      <div
        className={`w-[280px] sm:w-[400px] bg-white px-6 sm:px-14 py-6 sm:py-10 flex flex-col gap-4 sm:gap-8 font-Inter absolute right-3 z-20 shadow-md shadow-gray-300 rounded-xl transition-all duration-500 ${
          session
            ? "visible opacity-100  top-16 sm:top-24"
            : "invisible opacity-0 top-10"
        }`}
      >
        <h3 className="text-[#6B6B6B] font-semibold flex items-center gap-8">
          <GoInfo size={30} /> Session end Notice
        </h3>
        <p className="font-medium">
          Ending this session will clear all song request , including pending
          request, played and queued requests
        </p>
        <div className="flex gap-2">
          <button
            className="flex-1 py-2 rounded-md text-[#BCBCBC] border border-[#A2A2A2] font-medium"
            onClick={() => setSession(false)}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2 rounded-md text-white border bg-[#35CA8B] font-medium"
            onClick={() => setSession(false)}
          >
            Proceed
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
