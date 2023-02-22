import { BsClock, BsFillPlayFill } from "react-icons/bs";
import { FaTimesCircle } from "react-icons/fa";

type MusicRequestProps = {
  cover: string;
  title: string;
  artist: string;
  state: string;
};

const MusicRequestBox = ({
  cover,
  title,
  artist,
  state,
}: MusicRequestProps) => {
  const ReturnIcon = () => {
    if (state === "new" || state === "queued") {
      return (
        <span className="w-16 md:w-20 h-12 md:h-16 grid place-items-center bg-[#F2B71E] bg-opacity-30 rounded-full">
          <BsClock size={30} color="#F2B71E" />
        </span>
      );
    }
    if (state === "played") {
      return (
        <span className="w-16 md:w-20 h-12 md:h-16 grid place-items-center bg-[#35CA8B] bg-opacity-30 rounded-full">
          <BsFillPlayFill size={50} color="#35CA8B" />
        </span>
      );
    }
    if (state === "unavailable") {
      return (
        <span className="w-16 md:w-20 h-12 md:h-16 grid place-items-center bg-[#d41a1a] bg-opacity-30 rounded-full">
          <FaTimesCircle size={30} color="#d41a1a" />
        </span>
      );
    } else {
      return (
        <span className="w-16 md:w-20 h-12 md:h-16 grid place-items-center bg-[#F2B71E] bg-opacity-30 rounded-full">
          <BsClock size={50} color="#F2B71E" />
        </span>
      );
    }
  };

  return (
    <article className="flex gap-2 md:gap-5 items-center">
      <ReturnIcon />
      <div className="border border-[#d6d5d5] rounded-full px-4 py-2 md:py-4 w-full flex items-center gap-4">
        <img
          src={cover}
          alt="cover"
          className="w-10 md:w-14 h-10 md:h-14 rounded-full object-cover"
        />
        <div className="tracking-wider">
          <h2 className="font-medium text-base md:text-[18px]">{title}</h2>
          <h2>{artist}</h2>
        </div>
      </div>
    </article>
  );
};

export default MusicRequestBox;
