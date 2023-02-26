import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

import Tag from "../../components/Tag/Tag";
import { widthSetter } from "../../utils";
import TrackCard from "../../components/TrackCard";
import { Input, Message } from "../../components";
import ClubInfoCard from "../../components/ClubInfoCard";
import Image from "../../assets/Images/emptyy.png";
import Photo from "../../assets/Images/album-cover.png";
import {
  searchSpotifyTracks,
  getSpotifyToken,
} from "../../components/API/spotify";
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
import { useRequestMusic } from "../../hooks/useFirebase";

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
  const [requestedTracks, setRequestedTracks] = useState<
    RequestedTracksProps[]
  >([]);
  const [getErrors, setErrors] = useState<AlertProps>({
    type: "warning",
    status: true,
    message: "Club / DJ session request limit of 10 tracks request reached",
  });
  const [getReqErrors, setReqErrors] = useState<AlertProps>({
    type: "warning",
    status: true,
    message:
      "You recently made a request which have been queued, you will be able to make another request when the timer ends",
  });
  // const [time, setTime] = useState(0);
  // const [mins, setMins] = useState(0);
  // const [secs, setSecs] = useState(0);
  const [canRequest, setCanRequest] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null | undefined>(null);
  const [datas, setDatas] = useState<MusicType[]>();
  const [FilterDatas, setFilterDatas] = useState<MusicType[]>();

  const [networkError, setNetworkError] = useState(false);
  const [wrongLInk, setWrongLInk] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
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
      useGetRequest(user.email, setDatas);
      // useGetRequest("DJ YK", setDatas);
    }
  }, [user]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("mxrequest_id")!);
    setFilterDatas(datas?.filter((data) => data.user_id === id));
    console.log({ datas });
  }, [datas]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    // GETTING TRACKS FROM SPOTIFY
    (async () => {
      try {
        const trks = await searchSpotifyTracks(value);
        console.log({ tracksss: trks });
        if (trks) setTracks(trks);
      } catch (error: any) {
        if (error.code === "ERR_CANCELED") {
          setNetworkError(true);
        }
      }
    })();
  };
  const userSelectioin = (index: number) => {
    setCurrSelect(index);
  };

  const [lockInput, setLockInput] = useState(false);

  function millisToMinutesAndSeconds(millis: number) {
    const minutes = Math.floor(millis / 60000);
    const seconds = +((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  // FOR COUNTDOWN TIMER
  const countdownTimer = (then: number) => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = then - now;

      const value = millisToMinutesAndSeconds(diff);
      document.querySelector("#timer")!.innerHTML = value;

      if (now > then) {
        setLockInput(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    const timer = localStorage.getItem("mx_timer");

    if (timer) {
      const lockTime = JSON.parse(timer);

      if (lockTime < Date.now()) return;

      setLockInput(true);
      countdownTimer(lockTime);
    }
  }, []);

  const confirmSelection = (item: TrackInterface) => {
    if (limitReached) return;
    const options = {
      title: item.trackname,
      artist: item.artists,
      cover: item.cover,
    };
    useRequestMusic(user?.email!, options);
    let rq: RequestedTracksProps[] = [
      ...requestedTracks,
      { ...item, status: "queued" },
    ];
    localStorage.setItem("requested_tracks", JSON.stringify(rq));
    setCurrSelect(undefined);
    setSearch("");
    if (numOfTracks < max) setNumOfTracks(numOfTracks + 1);
    setRequestedTracks([...rq]);

    // lock the input and set up a timer
    setLockInput(true);
    const lockTime = Date.now() + 60000; // now + 1min
    countdownTimer(lockTime);
    localStorage.setItem("mx_timer", JSON.stringify(lockTime));
  };

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
            This is the official song request page for {user?.clubName}
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
                disabled={lockInput || !user?.session}
              />
            </form>

            <p className="text-slate-500 my-2">
              Search for tracks and click on the result to request them
            </p>
            {/* IF ALREADY MAKE REQUEST */}
            {lockInput && user && (
              <div className="rounded-full my-5 border-[var(--primary-color)] w-[max-content] border-[2px] text-slate-500 dark:text-gray-200 px-7 py-2 bg-[#b6ecd49b]">
                <span id="timer">0:00</span>s until you can request again
              </div>
            )}
            {/* IF CLUB IS NOT ACTIVE */}
            {user && !user.session && (
              <div className="rounded-full text-sm md:text-base w-[300px] md:w-auto my-5 border-[var(--primary-color)] border-[2px] text-slate-500 dark:text-gray-200 px-4 md:px-7 py-2 bg-[#b6ecd49b]">
                The club has to be active before you can make a request.
              </div>
            )}
          </div>

          {/* results */}
          {search.length > 0 ? (
            <section className="z-[500] h-[400px] absolute left-0 right-0 md:right-10 overflow-y-scroll bg-white dark:bg-black shadow-lg p-3 sm:p-10 rounded-xl border-[1px] scrollbar">
              {networkError && (
                <p>
                  Your network is not able to connect to Spotify right at the
                  moment. Please try again later!!
                </p>
              )}

              <div>
                {getTracks.map((item, index): JSX.Element => {
                  return (
                    <div
                      className="flex min-w-full overflow-x-hidden my-2"
                      key={index}
                    >
                      <span
                        onClick={() => userSelectioin(index)}
                        className={` cursor-pointer ${
                          currSelect === index
                            ? "min-w-[calc(100%-300px)] overflow-x-clip"
                            : "min-w-full"
                        }`}
                      >
                        <TrackCard
                          key={index}
                          isResult={true}
                          cover={item.cover}
                          title={item.trackname}
                          artist={item.artists}
                          className="rounded-lg hover:border-[var(--primary-color)] hover:border-2"
                        />{" "}
                      </span>
                      <div
                        className="text-rose-800 rounded-xl flex items-center justify-center min-h-full min-w-[150px] bg-rose-300 border-rose-700 border-[1px] cursor-pointer"
                        onClick={() => setCurrSelect(undefined)}
                      >
                        Cancel
                      </div>

                      <div
                        className="text-green-800 rounded-xl flex items-center justify-center min-h-full min-w-[150px] bg-green-300 cursor-pointer"
                        onClick={() => confirmSelection(item)}
                      >
                        Confirm
                      </div>
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

          <div className="w-full mt-10 md:max-h-[70vh] md:overflow-y-scroll overflow-x-hidden scrollbar">
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
