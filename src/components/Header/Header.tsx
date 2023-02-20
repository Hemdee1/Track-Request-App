import { useState } from "react";
import Logo from "../Logo";

const Header = () => {
  const [session, setSession] = useState(false);
  const img = false;

  const handleSession = () => {
    setSession((prev) => !prev);
  };

  return (
    <header className="w-full h-[124px] flex items-center bg-white font-Inter">
      <div className="w-[1200px] max-w-full mx-auto flex justify-between">
        <div className="flex gap-14">
          <Logo />
          <button className="bg-[#61818E] rounded-[26px] w-[162px] h-[47px] grid place-items-center text-white font-Inter font-medium">
            Track requests
          </button>
          <button className="rounded-[26px] w-[162px] h-[47px] grid place-items-center text-[#6B6B6B] font-Inter font-medium">
            Public page
          </button>
        </div>

        <div className="flex gap-[60px]">
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
    </header>
  );
};

export default Header;
