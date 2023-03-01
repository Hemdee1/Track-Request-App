import { useState, useEffect } from "react";
import Header from "../Header";

import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import {
  NewRequest,
  PlayedRequest,
  QueuedRequest,
  UnavailableRequest,
} from "../../pages";
import {
  MusicType,
  useAuthChange,
  useGetRequest,
  UserType,
} from "../../hooks/useFirebase";

const DashboardLayout = () => {
  const [user, setUser] = useState<UserType | null>();
  const [datas, setDatas] = useState<MusicType[] | undefined>();
  const [NewDatas, setNewDatas] = useState<MusicType[] | undefined>();
  const [PlayedDatas, setPlayedDatas] = useState<MusicType[] | undefined>();
  const [QueuedDatas, setQueuedDatas] = useState<MusicType[] | undefined>();
  const [UnavailableDatas, setUnavailableDatas] = useState<
    MusicType[] | undefined
  >();

  const [pageOpen, setPageOpen] = useState("new");

  useEffect(() => {
    useAuthChange(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      useGetRequest(user?.email!, setDatas);
    }
  }, [user]);

  useEffect(() => {
    setNewDatas(datas?.filter((data) => data.status === "new"));
    setPlayedDatas(datas?.filter((data) => data.status === "played"));
    setQueuedDatas(datas?.filter((data) => data.status === "queued"));
    setUnavailableDatas(datas?.filter((data) => data.status === "unavailable"));
  }, [datas]);

  return (
    <section>
      <div className="bg-white dark:bg-black text-black dark:text-white fixed z-10 w-full left-0 top-0">
        <Header />
        <div className="w-full h-[82px] relative">
          <GoArrowLeft className="absolute left-0 text-white top-7 text-xl select-none md:hidden" />
          <GoArrowRight className="absolute right-0 text-white top-7 text-xl select-none md:hidden" />

          <div className="w-full h-full bg-[#61818E] overflow-x-scroll lg:overflow-hidden scroll">
            <div className="h-full w-[720px] mx-auto flex items-center justify-center gap-8 ">
              <button
                onClick={() => setPageOpen("new")}
                className={`w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                  pageOpen === "new"
                    ? "text-[#61818E] bg-white"
                    : "bg-transparent text-white"
                }`}
              >
                New Request
              </button>
              <button
                onClick={() => setPageOpen("queued")}
                className={`w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                  pageOpen === "queued"
                    ? "text-[#61818E] bg-white"
                    : "bg-transparent text-white"
                }`}
              >
                Queued
              </button>
              <button
                onClick={() => setPageOpen("unavailable")}
                className={`w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                  pageOpen === "unavailable"
                    ? "text-[#61818E] bg-white"
                    : "bg-transparent text-white"
                }`}
              >
                Unavailable
              </button>
              <button
                onClick={() => setPageOpen("played")}
                className={`w-[142px] h-[47px] grid place-items-center font-Inter font-medium rounded-3xl transition-all duration-500 ${
                  pageOpen === "played"
                    ? "text-[#61818E] bg-white"
                    : "bg-transparent text-white"
                }`}
              >
                Played
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[162px] relative">
        {!datas ? (
          <section className="min-h-[90vh] grid place-items-center">
            <div className="loader"></div>
          </section>
        ) : (
          <>
            <div
              className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                pageOpen === "new"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              <NewRequest datas={NewDatas!} user={user!} />
            </div>
            <div
              className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                pageOpen === "played"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              <PlayedRequest datas={PlayedDatas!} user={user!} />
            </div>
            <div
              className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                pageOpen === "queued"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              <QueuedRequest datas={QueuedDatas!} user={user!} />
            </div>
            <div
              className={`absolute top-0 left-0 w-full transition-all duration-500 ${
                pageOpen === "unavailable"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
            >
              <UnavailableRequest datas={UnavailableDatas!} user={user!} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardLayout;
