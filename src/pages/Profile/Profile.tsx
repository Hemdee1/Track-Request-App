import { FaFacebook, FaInstagram, FaPen, FaTwitter } from "react-icons/fa";
import { FiDownload, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CopyIcon, Header } from "../../components";

const img = true;

const Profile = () => {
  return (
    <main className="pb-20">
      <div className="fixed left-0 top-0 w-full">
        <Header />
        <div className="w-full h-[82px] bg-[#61818E]">
          <div className="w-[640px] px-6 mx-auto max-w-full h-full flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <CopyIcon />
              <span className="text-white font-medium break-all">
                mxrequest.io/djhoolander
              </span>
            </div>
            <button className="w-12 md:w-[162px] h-[47px] bg-white rounded-3xl grid place-items-center text-[#61818E] font-medium ml-3">
              <span className="hidden md:block">Download QR</span>
              <FiDownload className="block md:hidden" size={30} />
            </button>
          </div>
        </div>
      </div>

      <section className="w-[640px] max-w-full mx-auto px-6 mt-72 font-Inter">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-5 items-center">
            {img ? (
              <img
                src="/user.png"
                alt="user"
                className="w-[90px] h-[90px] rounded-full bg-cover"
              />
            ) : (
              <div className="h-[90px] w-[90px] bg-[#35CA8B] grid place-items-center font-semibold text-2xl text-white rounded-full">
                D
              </div>
            )}

            <div className="font-medium text-[#6B6B6B]">
              <h3 className="text-[22px] mb-1">DJ Hoolander</h3>
              <h5>hello@gmail.com</h5>
            </div>
          </div>
          <div>
            <img
              src="/qr.png"
              alt="qrcode"
              className="w-[300px] md:w-[104px] h-[300px] md:h-[104px]"
            />
          </div>
        </div>

        <div className="mt-20">
          <article className="py-5 w-full border-b border-[#D9D9D9] flex gap-5 items-center text-[#6B6B6B]">
            <FaTwitter size={24} />
            <span className="font-medium text-xl break-all">
              twitter.com/dj_hoolander
            </span>
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9] flex gap-5 items-center text-[#6B6B6B]">
            <FaFacebook size={24} />
            <span className="font-medium text-xl break-all">
              facebook.com/dj_hoolander
            </span>
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9] flex gap-5 items-center text-[#6B6B6B]">
            <FaInstagram size={24} />
            <span className="font-medium text-xl break-all">
              finstagram.com/dj_hoolander
            </span>
          </article>
        </div>

        <div className="flex justify-center items-center gap-10 mt-20">
          <Link
            to="/profile/edit"
            className="px-7 py-2 bg-white rounded-md font-medium flex items-center gap-2 text-[#6B6B6B] border border-[#969696]"
          >
            Edit <FaPen />
          </Link>
          <button className="px-7 py-2 bg-red-200 rounded-md font-medium flex items-center gap-2 text-[#6B6B6B] border border-red-300">
            Logout <FiLogOut size={24} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
