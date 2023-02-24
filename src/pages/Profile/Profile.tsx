import { FaFacebook, FaInstagram, FaPen, FaTwitter } from "react-icons/fa";
import { FiDownload, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CopyIcon, Header } from "../../components";
import { useEffect, useState } from "react";
import { useAuthChange, useLogout, UserType } from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const url = "https://www.mxrequest/cp/";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>();
  const [openCopy, setOpenCopy] = useState(false);

  useEffect(() => {
    useAuthChange(setUser);
  }, []);

  const handleLogout = async () => {
    await useLogout();
    navigate("/login");
  };

  // download QR code
  const downloadQRCode = () => {
    const qrCode = document?.getElementById("qrCode") as HTMLCanvasElement;
    const qrCodeURL = qrCode
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    let link = document.createElement("a");
    link.href = qrCodeURL;
    link.download = "QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyURL = () => {
    navigator.clipboard.writeText(url + btoa(user?.email!));

    setOpenCopy(true);

    setTimeout(() => {
      setOpenCopy(false);
    }, 10000);
  };

  return (
    <main className="pb-20">
      <div className="fixed left-0 top-0 w-full">
        <Header />
        <div className="w-full h-[82px] bg-[#61818E] z-[2]">
          <div className="w-[740px] px-6 mx-auto max-w-full h-full flex items-center justify-between">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={copyURL}
            >
              <button className="relative">
                <CopyIcon />
                <span
                  className={`absolute left-0 px-2 py-1 -top-10 shadow-md shadow-gray-600 text-black bg-white font-medium rounded-lg transition-all duration-500 ${
                    openCopy ? "opacity-100 invisible" : "opacity-0 visible"
                  }`}
                >
                  Copied
                </span>
              </button>
              {user ? (
                <span className="text-white text-sm sm:text-base font-medium pr-5 dm:pr-10 break-all">
                  {url + btoa(user?.email)}
                </span>
              ) : (
                <span className="w-[200px] sm:w-[400px] max-w-full h-8 rounded-md bg-gray-200 animate-pulse"></span>
              )}
            </div>
            <button className="w-12 md:w-[162px] h-[47px] bg-white rounded-3xl grid place-items-center text-[#61818E] font-medium ml-3">
              <span className="hidden md:block" onClick={downloadQRCode}>
                Download QR
              </span>
              <FiDownload
                className="block md:hidden"
                size={30}
                onClick={downloadQRCode}
              />
            </button>
          </div>
        </div>
      </div>

      <section className="w-[740px] max-w-full mx-auto px-6 mt-52 md:mt-72 font-Inter">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-5 items-center">
            {user?.photoURL && !(user?.photoURL instanceof File) ? (
              <img
                src={user?.photoURL}
                alt="user"
                className="w-[90px] h-[90px] rounded-full object-cover"
              />
            ) : user ? (
              <div className="h-[90px] w-[90px] bg-[#35CA8B] grid place-items-center font-semibold text-2xl text-white rounded-full">
                {user?.clubName.slice(0, 1)}
              </div>
            ) : (
              <div className="h-[90px] w-[90px] bg-[#35CA8B] animate-pulse -z-[1] grid place-items-center font-semibold text-2xl text-white rounded-full"></div>
            )}

            {user ? (
              <div className="font-medium text-[#6B6B6B] break-all">
                <h3 className="text-[22px] mb-1">{user?.clubName}</h3>
                <h5>{user?.email}</h5>
              </div>
            ) : (
              <div className="-z-[1]">
                <span className="w-[100px] block max-w-full h-6 rounded-md bg-gray-200 animate-pulse"></span>
                <span className="w-[200px] mt-5 block max-w-full h-5 rounded-md bg-gray-200 animate-pulse"></span>
              </div>
            )}
          </div>
          <div className="h-[200px] md:h-[104px] p-2 flex justify-center items-center max-w-full">
            {/* <img
              src="/qr.png"
              alt="qrcode"
            /> */}
            {user ? (
              <QRCodeCanvas
                value={url + btoa(user?.email)}
                includeMargin
                className="w-full h-full"
                id="qrCode"
              />
            ) : (
              <div className="w-[100px] mt-5 block max-w-full h-[100px] rounded-md bg-gray-200 animate-pulse -z-[1]"></div>
            )}
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <article className="py-5 w-full border-b border-[#D9D9D9] flex gap-5 items-center text-[#6B6B6B]">
            <FaTwitter size={24} />
            {user ? (
              <span className="font-medium text-xl break-all">
                {/* twitter.com/dj_hoolander */}
                {user?.twitter}
              </span>
            ) : (
              <span className="w-[500px] block max-w-full h-6 rounded-md bg-gray-200 animate-pulse -z-[1]"></span>
            )}
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9] flex gap-5 items-center text-[#6B6B6B]">
            <FaFacebook size={24} />
            {user ? (
              <span className="font-medium text-xl break-all">
                {/* facebook.com/dj_hoolander */}
                {user?.facebook}
              </span>
            ) : (
              <span className="w-[500px] block max-w-full h-6 rounded-md bg-gray-200 animate-pulse -z-[1]"></span>
            )}
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9] flex gap-5 items-center text-[#6B6B6B]">
            <FaInstagram size={24} />
            {user ? (
              <span className="font-medium text-xl break-all">
                {/* finstagram.com/dj_hoolander */}
                {user?.instagram}
              </span>
            ) : (
              <span className="w-[500px] block max-w-full h-6 rounded-md bg-gray-200 animate-pulse -z-[1]"></span>
            )}
          </article>
        </div>

        <div className="flex justify-center items-center gap-10 mt-20">
          <Link
            to="/profile/edit"
            className="px-7 py-2 bg-white rounded-md font-medium flex items-center gap-2 text-[#6B6B6B] border border-[#969696]"
          >
            Edit <FaPen />
          </Link>
          <button
            className="px-7 py-2 bg-red-200 rounded-md font-medium flex items-center gap-2 text-[#6B6B6B] border border-red-300"
            onClick={handleLogout}
          >
            Logout <FiLogOut size={24} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
