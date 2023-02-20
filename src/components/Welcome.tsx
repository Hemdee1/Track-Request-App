import Message from "./Message/Message";
// import MessageImg from '../../assets/message.svg'
import MessageImg from "../assets/message.svg";
import { Button } from "./Button";

import { FaPlay } from "react-icons/fa";
import Pulse from "./Pulse";
import TrackCard from "./TrackCard";

const Welcome = () => {
  const btn = () => {
    console.log("clicked");
  };
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center">
      <h1 className="font-Zendots text-3xl font-bold text-slate-700">
        Welcome onboard,
      </h1>
      <h1 className="font-Zendots font-bold text-slate-900 text-6xl">
        Team Obnoxious 🚀
      </h1>

      <Message
        image={MessageImg}
        text="You currently have not made any track requests, your requests will be displayed in this section"
      />

      <Button type="primary" Label="Loading" onClick={btn} isLoading={true} />
      <Button
        type="secondary"
        Label="Create club profile"
        onClick={() => console.log("create club profile")}
      />
      <Button type="primary-rounded" Label="play" />
      <Button type="secondary-rounded" Label="Track unavailable" />

      <Pulse type="queued" />

      <TrackCard isResult={false}/>
    </div>
  );
};

export default Welcome;
