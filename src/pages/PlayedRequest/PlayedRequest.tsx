import { Message, MusicPlayedBox } from "../../components";

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

const PlayedRequest = () => {
  if (allMusic.length < 1) {
    return (
      <section className="pt-36">
        <Message
          image="/message.svg"
          text="You currently don't have any track played, your requests will be displayed in this section"
        />
      </section>
    );
  }

  return (
    <section className="min-h-[90vh] py-[87px] w-[606px] max-w-full mx-auto font-Inter">
      {allMusic.map((data, index) => (
        <MusicPlayedBox key={index} {...data} />
      ))}
    </section>
  );
};

export default PlayedRequest;
