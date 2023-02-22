type MusicNewBoxProps = {
  cover: string;
  title: string;
  artist: string;
};

const MusicNewBox = ({ cover, title, artist }: MusicNewBoxProps) => {
  return (
    <article className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4 pt-6 border-b border-[#61818E80] border-opacity-50">
      <div className="flex items-center gap-5">
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

      <div className="flex gap-2">
        <button className="w-[140px] h-[47px] grid place-items-center bg-white bg-opacity-20 rounded-3xl border border-[#A1A1A1] border-opacity-50 font-medium text-[#61818E]">
          Not available
        </button>
        <button className="w-[140px] h-[47px] grid place-items-center bg-[#35CA8B33] bg-opacity-20 rounded-3xl border border-[#61818E80] border-opacity-50 font-medium text-[#61818E]">
          Accept
        </button>
      </div>
    </article>
  );
};

export default MusicNewBox;
