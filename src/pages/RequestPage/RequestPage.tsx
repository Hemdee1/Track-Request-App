import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import { useState } from "react";
import { Message, MusicRequestBox } from "../../components";

const img = true;
const active = true;

const music = {
  cover: "/user.png",
  title: "Should have kissed you",
  artist: "Chris Brown",
  state: "new",
};

type musicType = {
  id: string;
  cover: string;
  title: string;
  artist: string;
  state: string;
};

// const allMusic: musicType[] = [];
const allMusic = [music, music, music, music, music, music];

const RequestPage = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <section className="mt-40 flex flex-col lg:flex-row gap-10 text-[#61818E] px-6 md:px-14 xl:px-40">
        <div className="flex-1 relative">
          <div className=" absolute -top-14 right-0">
            {active ? (
              <button className="px-5 py-3 font-medium rounded-[30px] bg-[#35CA8B] text-white animate-pulse">
                Active
              </button>
            ) : (
              <button className="px-5 py-3 font-medium rounded-[30px] bg-red-200">
                Inactive
              </button>
            )}
          </div>
          <div className="flex items-center flex-wrap gap-6">
            {img ? (
              <img
                src="/user.png"
                alt="user"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <div className="h-16 w-16 bg-[#35CA8B] grid place-items-center font-semibold text-2xl text-white rounded-full">
                D
              </div>
            )}

            <div className="h-14 w-[150px] grid place-items-center border border-[#AAAAAA] rounded-[30px] font-medium capitalize ml-3 break-all px-6">
              Dj hoolander
            </div>

            <div className="flex h-full gap-4 items-center ml-7">
              <button>
                <FaTwitter size={24} />
              </button>
              <button>
                <FaFacebook size={24} />
              </button>
              <button>
                <FaInstagram size={24} />
              </button>
            </div>
          </div>
          <h3 className="mt-6">
            This is the official song request page for <span>DJ hoolander</span>
          </h3>
          <div className="mt-[70px] md:mt-[108px]">
            <input
              type="search"
              placeholder="Search track"
              className="px-3 py-3 border border-[#AAAAAA] rounded-lg outline-none w-[400px] max-w-full text-black"
            />
            <h3 className="mt-4">
              Search for tracks and click on the result to request them
            </h3>
            <div className="mt-3 px-5 py-3 rounded-[30px] bg-[#35CA8B] bg-opacity-20 w-[400px] max-w-full">
              <span className="font-medium tracking-wider">04:58</span> until
              you can request again
            </div>
          </div>
        </div>

        <div className="flex-1 lg:pl-10 lg:border-l border-[#C1C1C1]">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Requests</h2>
            <div className="px-4 py-1 font-medium tracking-wide border border-[#35CA8B] rounded-[30px]">
              5/10
            </div>
          </div>
          {allMusic.length > 1 ? (
            <div className="mt-10 flex flex-col gap-6">
              {allMusic.map((music, index) => (
                <MusicRequestBox {...music} key={index} />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-col gap-6">
              <Message
                image="/message.svg"
                text="You currently have not made any track requests, your requests will be displayed in this section"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RequestPage;
