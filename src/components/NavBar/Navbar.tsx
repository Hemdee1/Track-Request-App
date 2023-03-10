import React, { useState } from "react";
import FullLogo from "../../assets/SVGs/FullLogo";
import LogoIcon from "../../assets/SVGs/LogoIcon";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../Button";
import Hamburger from "hamburger-react";
import { widthSetter } from "../../utils";
import { getLocalStorage, setThemeUpdate } from "../../hooks/useLocalstorage";

interface LinkProps {
  id: number;
  text: string;
  route: string;
  buttonChild?: React.ReactNode; // for the Button component in between the <NavLink />. NOT YET IMPLEMENTED.
}

interface MobileLinkProps extends LinkProps{
}

export const Navbar = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [links] = useState<LinkProps[]>([
    {
      id: 1, 
      text: "Home", 
      route: '/'
    }, 
    {
      id: 2, 
      text: "About", 
      route: '/about'
    }
  ])

  const [mobileLinks] = useState<MobileLinkProps[]>([
    {
      id: 1, 
      route: '/',
      text: "Home",
    },
    {
      id: 2, 
      route: '/about', 
      text: "About", 
    },
    {
      id: 3, 
      route: "/register", 
      text: "Create Club profile", 
    },
  ])

  const closeMenu = () => setIsOpen(false);

  const [theme, setTheme] = useState(getLocalStorage());

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setTheme(value);
    setThemeUpdate(value);
  };

  return (
    <nav className="bg-white text-black dark:bg-black dark:text-white lg:h-[100px] flex items-center justify-center overflow-x-hidden fixed z-[1000] w-full top-0">
      <div
        className={`navbarContent ${widthSetter} items-center justify-between lg:flex  hidden`}
      >
        <Link to="/" className="brand">
          <FullLogo />
        </Link>

        <div className="links flex">
          <ul className="flex gap-20 items-center text-slate-500">
            {
              links.map((link: {id: number; text: string; route: string;}) => (
                <li key={link.id}>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) => 
                      isActive ? " text-[var(--primary-color)]" : "" 
                    }
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))
            }
            
            <select
              className="px-4 py-1 shadow bg-gray-100 dark:bg-black shadow-gray-400 rounded-md"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System &nbsp; &nbsp;</option>
            </select>
          </ul>
        </div>

        <div className="cta flex gap-5">
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? " text-[var(--primary-color)]" : ""
            }
          >
            <Button
              type="secondary"
              Label="Create club profile"
              className="px-[20px]"
            />
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? " text-[var(--primary-color)]" : ""
            }
          >
            <Button type="primary" Label="Login" />
          </NavLink>
        </div>
      </div>

      {/* Mobile navigation */}
      <section className="mobile-menue lg:hidden flex flex-col w-full z-[1000]">
        <div className="mobile-menue-top w-full px-[2%] fixed flex mx-auto items-center justify-between h-[100px] bg-white text-black dark:bg-black dark:text-white">
          <Link to="/" className="brand" onClick={closeMenu}>
            <LogoIcon />
          </Link>

          <div className="mobile-cta flex items-center gap-2 ">
            <NavLink to="/register" className={`${isOpen ? "hidden" : "flex"}`}>
              <Button
                type="secondary"
                Label="Create club profile"
                className="px-[10px]"
              />
            </NavLink>
            <span className="">
              <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </span>
          </div>
        </div>

        <div
          className={`menu-items  fixed left-0 top-[100px] w-full bg-white text-black dark:bg-black dark:text-white ${
            isOpen
              ? "translate-x-[0%] h-[calc(100vh-100px)]"
              : "-translate-x-[100%] h-auto"
          }`}
        >
          <ul>
            {
              mobileLinks.map((mlink: MobileLinkProps) => (
                <li className="w-full h-[80px]">
                  <NavLink
                    to={mlink.route}
                    className={({ isActive }) =>
                      isActive
                        ? ` h-full items-center bg-[var(--secondary-color)] text-slate-200 w-full flex px-7 `
                        : `
                        h-full items-center hover:bg-[var(--secondary-color)] hover:text-slate-200 w-full flex px-7
                        `
                          }
                          // onClick={mlink.handleClick}
                          onClick={closeMenu}
                        >
                          {mlink.text}
                  </NavLink>
                </li>
              ))
            }

            <li className="h-[80px] mt-5 flex items-center px-7">
              <NavLink className="w-full" to="/login" onClick={closeMenu}>
                <Button type="primary" fullWidth={true} Label="Login" />
              </NavLink>
            </li>
            <span className=" font-medium ml-7">Theme:</span>
            <select
              className="px-6 py-2 shadow bg-gray-100 dark:bg-black shadow-gray-400 rounded-md  m-7"
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System &nbsp; &nbsp;</option>
            </select>
          </ul>

          <p className="copyright text-slate-400 w-full text-center absolute bottom-10">
            ?? copyright mxrequest 2023
          </p>
        </div>
      </section>
    </nav>
  );
};
