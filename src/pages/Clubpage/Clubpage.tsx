import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import Tag from "../../components/Tag/Tag";
import { widthSetter } from "../../utils";
import TrackCard from "../../components/TrackCard";
import { Input, Message } from "../../components";
import ClubInfoCard from "../../components/ClubInfoCard";
import Image from "../../assets/Images/emptyy.png";
import Photo from "../../assets/Images/album-cover.png";
import { searchTracks } from "../../components/API/spotify";
import { Logger } from "../../utils";
import Alert, { AlertProps } from "../../components/Alert/Alert";
import {
  MusicType,
  useGetClubProfile,
  useGetRequest,
  UserType,
} from "../../hooks/useFirebase";
import { useLocation } from "react-router";
import { musicList } from "../../hooks/offlineFile";

export interface TrackInterface {
  cover: string;
  artists: string;
  trackname: string;
}

interface Tx {
  mins: number;
  secs: number;
  canRequest: boolean;
}
export interface RequestedTracksProps extends TrackInterface {
  status: "queued" | "played" | "unavailable";
}

// SET AN ID FOR THE NEW USER
localStorage.getItem("mxrequest_id")
  ? null
  : localStorage.setItem(
      "mxrequest_id",
      "" + Date.now() + Math.round(Math.random() * 1000000)
    );

// COMPONENT
const Clubpage = () => {
  const [search, setSearch] = useState<string>("");
  const [getTracks, setTracks] = useState<TrackInterface[]>([]);
  const [currSelect, setCurrSelect] = useState<number>();
  const [limitReached, setLimitReached] = useState<boolean>(false);
  const [numOfTracks, setNumOfTracks] = useState<number>(0);
  const [max, setMax] = useState<number>(10);
  // const [getErrors, setErrors] = useState<AlertProps>({
  //   type: "warning",
  //   status: true,
  //   message: "Club / DJ session request limit of 10 tracks request reached",
  // });
  // const [getReqErrors, setReqErrors] = useState<AlertProps>({
  //   type: "warning",
  //   status: true,
  //   message:
  //     "You recently made a request which have been queued, you will be able to make another request when the timer ends",
  // });
  // const [time, setTime] = useState(0);
  // const [mins, setMins] = useState(0);
  // const [secs, setSecs] = useState(0);
  const [canRequest, setCanRequest] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null | undefined>(null);
  const [datas, setDatas] = useState<MusicType[]>();
  const [FilterDatas, setFilterDatas] = useState<MusicType[]>();

  const [filterMusic, setFilterMusic] = useState<typeof musicList>([]);

  const [wrongLInk, setWrongLInk] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    // const link = "https://www.mxrequest/cp/c2FubXVoeUBnbWFpbC5jb20=";
    const url = pathname.split("/");

    try {
      const email = atob(url[url.length - 1]);

      useGetClubProfile(email, setUser);
    } catch (error) {
      setWrongLInk(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      // useGetRequest(user.email, setDatas);
      useGetRequest("DJ YK", setDatas);
    }
  }, [user]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("mxrequest_id")!);

    setFilterDatas(datas?.filter((data) => data.user_id === id));
  }, [datas]);

  const handleSearchChange = (value: string) => {
    setSearch(value);

    const filter = musicList.filter(
      (music) =>
        music.artist.toLowerCase().includes(search) ||
        music.title.toLowerCase().includes(search)
    );

    setFilterMusic(filter);
  };

  const selectMusic = () => {};

  // IF THE LINK IS INCORRECT, SHOW ERROR PAGE
  if (user === undefined || wrongLInk) {
    return (
      <div className="w-full min-h-[90vh] pt-[80px] grid place-items-center px-6">
        <div className="flex flex-col gap-6 items-center">
          <img src="/failed.ico" alt="failed image" className="w-20" />
          <h1 className="font-medium text-center">
            OOPS!!! <br /> The link you entered is Incorrect <br /> Or the Club
            Profile has been deleted
          </h1>
        </div>
      </div>
    );
  }

  // IF THERE IS NO USER, SHOW LOADING PAGE
  if (!user)
    return (
      <div className="w-full min-h-[90vh] pt-[80px] grid place-items-center">
        <div className="flex flex-col gap-6 items-center">
          <span className="loader"></span>
          <h1 className="font-medium text-center">
            Fetching Club Profile, <br /> Wait a moment....
          </h1>
        </div>
      </div>
    );

  return (
    <>
      <section
        className={`${widthSetter} mx-auto pt-[200px] min-h-screen flex flex-wrap`}
      >
        <div className=" w-[90%] md:w-[60%] mx-auto relative pr-[0px] sm:pr-[5%]">
          <div className=" absolute -top-14 right-0 sm:right-6">
            {user && user?.session ? (
              <div className="px-5 py-3 text-sm font-medium rounded-[30px] bg-[#35CA8B] text-white animate-pulse">
                Active
              </div>
            ) : user && !user.session ? (
              <div className="px-3 sm:px-5 py-2 sm:py-3 text-sm font-medium rounded-[30px] bg-gray-200 dark:bg-gray-700">
                Inactive
              </div>
            ) : (
              <div className="px-10 py-5 rounded-[30px] bg-gray-200 animate-pulse"></div>
            )}
          </div>
          <div className="flex items-center flex-wrap gap-6">
            {user?.photoURL && !(user?.photoURL instanceof File) ? (
              <img
                src={user?.photoURL!}
                alt="user"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : user ? (
              <div className="h-16 w-16 bg-[#35CA8B] grid place-items-center font-semibold text-2xl text-white rounded-full">
                {user?.clubName.slice(0, 1)}
              </div>
            ) : (
              <div className="h-16 w-16 bg-[#35CA8B] animate-pulse rounded-full"></div>
            )}

            {user ? (
              <div className="h-14 w-[180px] sm:w-auto grid place-items-center border border-[#AAAAAA] rounded-[30px] font-medium capitalize ml-3 text-center text-[#35CA8B] px-6">
                {user.clubName}
              </div>
            ) : (
              <div className="h-14 w-[150px] animate-pulse rounded-[30px] bg-gray-300"></div>
            )}

            <div className="flex h-full gap-4 items-center ml-7 text-[#35CA8B]">
              {user?.twitter && (
                <a href={user?.twitter} target="_blank">
                  <FaTwitter size={24} />
                </a>
              )}
              {user?.facebook && (
                <a href={user?.facebook} target="_blank">
                  <FaFacebook size={24} />
                </a>
              )}
              {user?.instagram && (
                <a href={user?.instagram} target="_blank">
                  <FaInstagram size={24} />
                </a>
              )}
            </div>
          </div>
          <h3 className="mt-6 mb-10 text-slate-500">
            This is the official song request page for{" "}
            <span className="font-medium">{user?.clubName} Club</span>
          </h3>
          <div>
            <form className="w-[100%]">
              <Input
                label="Search"
                name="Search"
                type="text"
                value={search}
                placeholder="Ex: Artist name - track title"
                onChange={handleSearchChange}
                autocomplete="off"
                required
              />
            </form>

            <p className="text-slate-500 my-2">
              Search for tracks and click on the result to request them
            </p>
            {/* {!canRequest ? (
              <Tag
                content={`${mins}:${secs}s until you can request again`}
                isFilled={true}
                className="my-5"
              />
            ) : (
              ""
            )} */}
          </div>

          {/* results */}
          {search.length > 0 ? (
            <section className="z-[500] h-[300px] absolute right-0 md:right-14 left-0 overflow-y-scroll shadow-md p-3 sm:p-10 rounded-xl shadow-gray-600 backdrop-blur-lg">
              <div>
                {filterMusic.map((item, index): JSX.Element => {
                  return (
                    <div
                      key={index}
                      className="flex min-w-full overflow-x-hidden my-4"
                    >
                      <span
                        onClick={() => selectMusic()}
                        className={` cursor-pointer ${
                          currSelect === index
                            ? "min-w-[calc(100%-300px)]"
                            : "min-w-full"
                        }`}
                      >
                        <TrackCard
                          key={index}
                          isResult={true}
                          cover={item.cover}
                          title={item.title}
                          artist={item.artist}
                          className="rounded-lg bg-slate-100 dark:bg-gray-900 hover:border-[var(--primary-color)] hover:border-2"
                        />{" "}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : (
            <></>
          )}
          {/* end of results */}
        </div>

        {/* request list */}
        <div className="w-[96%] mx-auto md:w-[40%] md:mt-0 mt-10 md:border-l-[1px] border-slate-200 md:pl-10">
          <div className="flex items-center justify-between">
            <p>Requests</p>
            <Tag content={`${numOfTracks} / ${max}`} isFilled={false} />
          </div>

          <div className="w-full mt-10 md:max-h-[70vh] md:overflow-y-scroll overflow-x-hidden">
            {FilterDatas && FilterDatas?.length > 0 ? (
              FilterDatas?.map((data, index) => {
                return (
                  <TrackCard
                    title={data.title}
                    artist={data.artist}
                    cover={data.cover}
                    type={`${data.status}`}
                    isResult={false}
                    key={index}
                    className="my-2 min-w-full"
                  />
                );
              })
            ) : (
              <Message
                image={Image}
                text="You currently have not made any track requests, your requests will be displayed in this section"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Clubpage;
