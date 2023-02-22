type MusicPlayedBoxProps = {
  cover: string;
  title: string;
  artist: string;
};

const MusicPlayedBox = ({ cover, title, artist }: MusicPlayedBoxProps) => {
  return (
    <article className="flex justify-center sm:justify-between pb-4 pt-6 border-b border-[#61818E80] border-opacity-50">
      <div className="flex items-center gap-5">
        <img
          src={cover}
          alt="cover-image"
          className="w-14 h-14 rounded-full bg-cover"
        />
        <div>
          <h3 className="font-medium text-[#676767]">{title}</h3>
          <h4 className="text-[#7C7C7C] font-light">{artist}</h4>
        </div>
      </div>

      <span className="w-[122px] h-[47px] hidden sm:grid place-items-center bg-[#35CA8B33] bg-opacity-20 rounded-3xl border border-[#61818E80] border-opacity-50 font-medium text-[#61818E]">
        Played
      </span>
    </article>
  );
};

export default MusicPlayedBox;
