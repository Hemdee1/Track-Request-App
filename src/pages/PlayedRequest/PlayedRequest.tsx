import { Message, MusicPlayedBox } from "../../components";
import { MusicType, UserType } from "../../hooks/useFirebase";

type propsType = { datas: MusicType[] | null; user: UserType | null };

const PlayedRequest = ({ datas }: propsType) => {
  if (datas?.length! < 1) {
    return (
      <section className="min-h-[90vh] pt-36">
        <Message
          image="/message.svg"
          text="You currently don't have any played requests, your requests will be displayed in this section"
        />
      </section>
    );
  }

  return (
    <section className="min-h-[90vh] py-[30px] sm:py-[87px] w-[606px] max-w-full mx-auto font-Inter">
      {datas?.map((data, index) => (
        <MusicPlayedBox key={index} {...data} />
      ))}
    </section>
  );
};

export default PlayedRequest;
