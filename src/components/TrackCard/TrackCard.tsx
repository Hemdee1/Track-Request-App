import React from "react";
import Pulse from "../Pulse";
import AlbumArt from "../../assets/Images/album-cover.png";
import { TrackCardProps } from "./Track.card.type";

const TrackCard = (props: TrackCardProps): JSX.Element => {
  return (
    <div className={`flex items-center ${props.className ?? ""}`}>
      {props.isResult ? "" : <Pulse type={props.type ?? "played"} />}

      <div
        className={`
          flex items-center md:gap-5 gap-2 
          border-[2px]
          md:p-2 p-2 
          ${props.isResult ? " rounded-lg" : "rounded-full"}
          ${props.isResult ? "w-full" : "md:w-[300px] min-w-auto max-w-[80%]"}
          pr-10
        `}
      >
        <div
          className="
          image 
          md:w-[80px] w-[55px]
          rounded-full 
          overflow-hidden
        "
        >
          <img src={props.cover ?? AlbumArt} alt="song title" />
        </div>

        <div className="details">
          <p className="songTitle text-xs sm:text-sm">{props.title}</p>
          <p className="artistName text-stone-400 text-xs sm:text-base">
            {props.artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
