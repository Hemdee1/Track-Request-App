import { BiPlay } from "react-icons/bi";

type MusicUnavailableBoxProps = {
  cover: string;
  title: string;
  artist: string;
};

const MusicUnavailableBox = ({
  cover,
  title,
  artist,
}: MusicUnavailableBoxProps) => {
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

      <span className="px-1 sm:px-3 h-10 sm:h-[47px] bg-gray-400 flex justify-center items-center gap-2 rounded-3xl border border-[#61818E80] border-opacity-50 font-medium text-gray-200">
        <span className="hidden sm:block">Unvailable</span>
        <BiPlay className="text-gray-500" size={30} />
      </span>
    </article>
  );
};

export default MusicUnavailableBox;
