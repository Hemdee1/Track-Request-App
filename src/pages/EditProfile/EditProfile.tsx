import { Header } from "../../components";

const EditProfile = () => {
  const img = true;
  return (
    <main className="pb-20">
      <div className="w-full fixed left-0 top-0 z-10">
        <Header />
      </div>
      <div className="mt-40 w-[640px] px-6 mx-auto max-w-full font-Inter">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="relative overflow-hidden">
            {img ? (
              <img
                src="/user.png"
                alt="user"
                className="h-[200px] w-[200px] rounded-full bg-cover"
              />
            ) : (
              <div className="h-[200px] w-[200px] bg-[#35CA8B] grid place-items-center font-semibold text-[70px] text-white rounded-full">
                D
              </div>
            )}
            <input
              type="file"
              name="profilePicture"
              id="profilePicture"
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
          <h3 className="text-[#6B6B6B] font-medium mt-2">
            Click on the picture above to change your profile picture
          </h3>
        </div>

        <div className="mt-10">
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="Email"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Email
            </label>
            <input
              type="text"
              value="hello@gmail.com"
              disabled
              className="w-full px-6 py-3 bg-[#b5c2c780] rounded-md"
            />
            <p className="mt-1 text-[#6B6B6B]">
              Note: Your email can't be changed
            </p>
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="username"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-6 py-3 bg-[#b5c2c780] rounded-md"
            />
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="facebook"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Facebook link:
            </label>
            <input
              type="text"
              name="facebook"
              className="w-full px-6 py-3 bg-[#b5c2c780] rounded-md"
            />
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="twitter"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Twitter link:
            </label>
            <input
              type="text"
              name="twitter"
              className="w-full px-6 py-3 bg-[#b5c2c780] rounded-md"
            />
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="instagram"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Instagram link:
            </label>
            <input
              type="text"
              name="instagram"
              className="w-full px-6 py-3 bg-[#b5c2c780] rounded-md"
            />
          </article>
        </div>
      </div>
      <button className="px-7 py-2 mx-auto mt-10 bg-[#35CA8B] text-white text-xl rounded-3xl font-medium flex items-center">
        Submit
      </button>
    </main>
  );
};

export default EditProfile;
