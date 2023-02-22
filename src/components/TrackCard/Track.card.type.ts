import { PulseProp } from "../Pulse/pulse.type";

export type TrackCardProps = {
  strech?: "full" | "half";
  width?: string
  type?: PulseProp["type"];
  isResult: boolean;
  className?: string;
}