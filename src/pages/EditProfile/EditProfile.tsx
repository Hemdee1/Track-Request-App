import { Button, Header } from "../../components";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  useAuthChange,
  UserType,
  useUpdateProfile,
} from "../../hooks/useFirebase";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserType | null>();
  const [img, setImg] = useState("");

  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    useAuthChange(setUser);
  }, []);

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (!file) return;
    if (!user) return;

    console.log(URL.createObjectURL(file[0]));

    setImg(URL.createObjectURL(file[0]));
    setUser({ ...user, photoURL: file[0] });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = await useUpdateProfile(user!);

    setLoading(false);
    if (data === undefined) {
      navigate("/profile");
    }
  };

  return (
    <main className="pb-20">
      <div className="w-full fixed left-0 top-0 z-10">
        <Header />
      </div>
      <div className="pt-40 w-[640px] px-6 mx-auto max-w-full font-Inter">
        <h1 className="font-bold text-2xl text-[#6B6B6B] text-center mb-10 uppercase">
          Update Your Profile
        </h1>
        <div className="w-full flex flex-col justify-center items-center">
          {/* FOUR STATE FOR THE IMAGE */}
          <div className="relative overflow-hidden">
            {user?.photoURL && !(user?.photoURL instanceof File) ? (
              <img
                src={user?.photoURL}
                alt="user"
                className="h-[200px] w-[200px] rounded-full object-cover"
              />
            ) : img ? (
              <img
                src={img}
                alt="user"
                className="h-[200px] w-[200px] rounded-full object-cover"
              />
            ) : user ? (
              <div className="h-[200px] w-[200px] bg-[#35CA8B] grid place-items-center font-semibold text-[70px] text-white rounded-full">
                {user?.clubName.slice(0, 1)}
              </div>
            ) : (
              <div className="h-[200px] w-[200px] bg-[#35CA8B] animate-pulse rounded-full"></div>
            )}
            {/*  */}
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleChangeImg}
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
            {user ? (
              <input
                type="text"
                value={user?.email}
                onChange={(e) =>
                  user ? setUser({ ...user, email: e.target.value }) : null
                }
                disabled
                className="w-full px-6 py-3 border-2 border-[#b5c2c780] bg-gray-300 dark:bg-gray-600 rounded-md"
              />
            ) : (
              <div className="w-full max-w-full h-12 rounded-md bg-gray-200 animate-pulse"></div>
            )}
            <p className="mt-1 text-[#6B6B6B]">
              Note: Your email can't be changed
            </p>
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="username"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Full Name:
            </label>
            {user ? (
              <input
                type="text"
                name="fullname"
                value={user?.fullName}
                onChange={(e) =>
                  user ? setUser({ ...user, fullName: e.target.value }) : null
                }
                className="w-full px-6 py-3 border-2 border-[#b5c2c780] bg-white dark:bg-black rounded-md"
              />
            ) : (
              <div className="w-full max-w-full h-12 rounded-md bg-gray-200 animate-pulse"></div>
            )}
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="username"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Club Name:
            </label>
            {user ? (
              <input
                type="text"
                name="clubname"
                value={user?.clubName}
                onChange={(e) =>
                  user ? setUser({ ...user, clubName: e.target.value }) : null
                }
                className="w-full px-6 py-3 border-2 border-[#b5c2c780] bg-white dark:bg-black rounded-md"
              />
            ) : (
              <div className="w-full max-w-full h-12 rounded-md bg-gray-200 animate-pulse"></div>
            )}
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="facebook"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Facebook link:
            </label>
            {user ? (
              <input
                type="text"
                name="facebook"
                value={user?.facebook}
                onChange={(e) =>
                  user ? setUser({ ...user, facebook: e.target.value }) : null
                }
                className="w-full px-6 py-3 border-2 border-[#b5c2c780] bg-white dark:bg-black rounded-md"
              />
            ) : (
              <div className="w-full max-w-full h-12 rounded-md bg-gray-200 animate-pulse"></div>
            )}
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="twitter"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Twitter link:
            </label>
            {user ? (
              <input
                type="text"
                name="twitter"
                value={user?.twitter}
                onChange={(e) =>
                  user ? setUser({ ...user, twitter: e.target.value }) : null
                }
                className="w-full px-6 py-3 border-2 border-[#b5c2c780] bg-white dark:bg-black rounded-md"
              />
            ) : (
              <div className="w-full max-w-full h-12 rounded-md bg-gray-200 animate-pulse"></div>
            )}
          </article>
          <article className="py-5 w-full border-b border-[#D9D9D9]">
            <label
              htmlFor="instagram"
              className="block text-[#6B6B6B] mb-2 font-medium"
            >
              Instagram link:
            </label>
            {user ? (
              <input
                type="text"
                name="instagram"
                value={user?.instagram}
                onChange={(e) =>
                  user ? setUser({ ...user, instagram: e.target.value }) : null
                }
                className="w-full px-6 py-3 border-2 border-[#b5c2c780] bg-white dark:bg-black rounded-md"
              />
            ) : (
              <div className="w-full max-w-full h-12 rounded-md bg-gray-200 animate-pulse"></div>
            )}
          </article>
        </div>
      </div>

      <Button
        Label="Submit"
        type="primary"
        altText="button"
        className="mx-auto font-medium text-xl mt-10"
        isLoading={loading}
        onClick={handleSubmit}
      />
    </main>
  );
};

export default EditProfile;
