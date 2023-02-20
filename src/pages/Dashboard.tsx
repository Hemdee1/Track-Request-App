import { useState } from "react";
import { Header, Message } from "../components";
import MessageImg from "../assets/message.svg";

const Dashboard = () => {
  const [state, setState] = useState("new");

  return (
    <section>
      <Header />
      <div className="w-full h-[82px] bg-[#61818E] flex items-center justify-center gap-8">
        <button
          onClick={() => setState("new")}
          className={`w-[142px] h-[47px] grid place-items-center font-medium rounded-3xl transition-all duration-500 ${
            state === "new"
              ? "text-[#61818E] bg-white"
              : "bg-transparent text-white"
          }`}
        >
          New Request
        </button>
        <button
          onClick={() => setState("queued")}
          className={`w-[142px] h-[47px] grid place-items-center font-medium rounded-3xl transition-all duration-500 ${
            state === "queued"
              ? "text-[#61818E] bg-white"
              : "bg-transparent text-white"
          }`}
        >
          Queued
        </button>
        <button
          onClick={() => setState("unavailable")}
          className={`w-[142px] h-[47px] grid place-items-center font-medium rounded-3xl transition-all duration-500 ${
            state === "unavailable"
              ? "text-[#61818E] bg-white"
              : "bg-transparent text-white"
          }`}
        >
          Unavailable
        </button>
        <button
          onClick={() => setState("played")}
          className={`w-[142px] h-[47px] grid place-items-center font-medium rounded-3xl transition-all duration-500 ${
            state === "played"
              ? "text-[#61818E] bg-white"
              : "bg-transparent text-white"
          }`}
        >
          Played
        </button>
      </div>

      <div className="mt-36">
        <Message
          image={MessageImg}
          text="You currently have not made any track requests, your requests will be displayed in this section"
        />
      </div>
    </section>
  );
};

export default Dashboard;

// FOR DJ PROFILE PAGE
//  <div className="w-full h-[82px] bg-[#61818E] flex items-center justify-center gap-[219px]">
//  <div className="flex gap-2 items-center">
// <CopyIcon />
// <span className="text-white font-medium">
//   mxrequest.io/djhoolander
// </span>
// </div>
// </div>
