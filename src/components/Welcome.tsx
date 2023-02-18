import Message from "./Message/Message";
// import MessageImg from '../../assets/message.svg'
import MessageImg from '../assets/message.svg';

const Welcome = () => {
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
    </div>
  );
};

export default Welcome;
