import { BiPlay } from "react-icons/bi";
import { MusicType, useUpdateMusicState } from "../../hooks/useFirebase";

type Clubname = {
  clubName: string;
};
type MusicQueuedBoxProps = MusicType & Clubname;

const MusicQueuedBox = ({
  cover,
  title,
  artist,
  id,
  clubName,
}: MusicQueuedBoxProps) => {
  // const handleClick = (status: "played") => {
  //   useUpdateMusicState(clubName, id, status);
  // };

  const handleClick = (status: "played") => {
    useUpdateMusicState("DJ YK", id, status);
  };

  return (
    <article className="px-6 flex justify-between pb-4 pt-6 border-b border-[#61818E80] border-opacity-50">
      <div className="flex items-center gap-5 px-1">
        <img
          src={cover}
          alt="cover-image"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-[#676767]">{title}</h3>
          <h4 className="text-[#7C7C7C] font-light">{artist}</h4>
        </div>
      </div>

      <button
        className="w-10 sm:w-[122px] h-10 sm:h-[47px] flex justify-center items-center gap-2 bg-[#35CA8B33] bg-opacity-20 rounded-3xl border border-[#61818E80] border-opacity-50 font-medium text-[#61818E]"
        onClick={() => handleClick("played")}
      >
        <span className="hidden sm:block">Play</span>
        <BiPlay color="#42AA89" size={30} />
      </button>
    </article>
  );
};

export default MusicQueuedBox;
