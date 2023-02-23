import { Message, MusicUnavailableBox } from "../../components";
import { useEffect, useState } from "react";
import {
  MusicType,
  useAuthChange,
  useGetRequest,
  UserType,
} from "../../hooks/useFirebase";

const music = {
  cover: "/user.png",
  title: "Should have kissed you",
  artist: "Chris Brown",
};

type musicType = {
  id: string;
  cover: string;
  title: string;
  artist: string;
};

// const allMusic: musicType[] = [];
const allMusic = [music, music, music, music, music, music];

const UnavailableRequest = () => {
  const [user, setUser] = useState<UserType>();
  const [datas, setDatas] = useState<MusicType[] | undefined>([]);
  const [FilterDatas, setFilterDatas] = useState<MusicType[] | undefined>();

  useEffect(() => {
    useAuthChange(setUser);
  }, []);

  useEffect(() => {
    setFilterDatas(datas?.filter((data) => data.status === "unavailable"));
  }, [datas]);

  useEffect(() => {
    useGetRequest("DJ YK", setDatas);
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     useGetRequest(user?.clubName!, setDatas);
  //   }
  // }, [user]);

  if (!FilterDatas || FilterDatas?.length < 1) {
    return (
      <section className="pt-36">
        <Message
          image="/message.svg"
          text="You currently don't have any queued track, your requests will be displayed in this section"
        />
      </section>
    );
  }

  return (
    <section className="min-h-[90vh] py-[30px] sm:py-[87px] w-[606px] max-w-full mx-auto font-Inter">
      {FilterDatas.map((data, index) => (
        <MusicUnavailableBox key={index} {...data} />
      ))}
    </section>
  );
};

export default UnavailableRequest;
