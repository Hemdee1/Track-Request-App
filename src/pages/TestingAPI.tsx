import { useEffect, useState } from "react";
import {
  MusicType,
  useAuthChange,
  useClearClubSession,
  useCustomError,
  useGetRequest,
  useLogin,
  useLogout,
  useRequestMusic,
  UserType,
  useSignIn,
  useSignInWithGoogle,
  useUpdateMusicState,
  useUpdateProfile,
} from "../hooks/useFirebase";
import { uploadImage } from "../hooks/useUpload";

const TestingAPI = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const [id, setId] = useState("");
  const [state, setState] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [img, setImg] = useState<File>();

  const [user, setUser] = useState<UserType | null>();

  const [datas, setDatas] = useState<MusicType[]>();
  const [newDatas, setNewDatas] = useState<MusicType[]>();
  const [queDatas, setQueDatas] = useState<MusicType[]>();
  const [userDatas, setUserDatas] = useState<MusicType[]>();

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(datas);
  }, [datas]);

  const upload = () => {
    if (img) {
      uploadImage(img);
    }
  };

  const update = async () => {
    if (user) {
      const value = {
        ...user,
        username: userName,
        facebook: email,
        instagram: password,
      };

      if (img) {
        value.photoURL = img;
      } else {
        value.photoURL = user.photoURL;
      }

      await useUpdateProfile(value);
    } else return;
  };

  const sendRequest = async () => {
    await useRequestMusic("DJ YK", { title, artist, cover: "cover.jpg" });

    setTitle("");
    setArtist("");
  };

  const Signin = async () => {
    try {
      await useSignIn(email, password, userName, "");

      setEmail("");
      setPassword("");
    } catch (err: any) {
      const error = useCustomError(err.message);
      console.log(error);
    }
  };

  const Login = async () => {
    try {
      await useLogin(email, password);

      setEmail("");
      setPassword("");
    } catch (err: any) {
      const error = useCustomError(err.message);
      console.log(error);
    }
  };

  const updateState = () => {
    if (!state || !id) return;

    useUpdateMusicState("DJ YK", id, "new");
  };

  useEffect(() => {
    useGetRequest("DJ YK", setDatas);
  }, []);

  useEffect(() => {
    useAuthChange(setUser);
  }, []);

  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem("mxrequest_id") || "");
    if (datas) {
      setQueDatas(datas.filter((data) => data.status === "que"));
      setNewDatas(datas.filter((data) => data.status === "new"));
      setUserDatas(datas.filter((data) => data.user_id === user_id));
    }
  }, [datas]);

  localStorage.getItem("mxrequest_id")
    ? null
    : localStorage.setItem(
        "mxrequest_id",
        "" + Date.now() + Math.round(Math.random() * 1000000)
      );

  return (
    <section className="p-10">
      <div className="bg-slate-300 p-3">
        <h4>Request A New Song</h4>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="artist"
          className="ml-4"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <button onClick={sendRequest}>Request</button>
        <button className="ml-10" onClick={() => useClearClubSession("DJ YK")}>
          Clear Datas
        </button>
      </div>

      <div className="bg-slate-300 p-3 mt-5">
        <h4>Update Song State</h4>
        <input
          type="text"
          placeholder="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="state"
          className="ml-4"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button onClick={updateState}>Update</button>
      </div>

      <div className="bg-slate-300 p-3 mt-5">
        <h4>Sign In</h4>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          className="ml-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          className="ml-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <button onClick={Signin} className="m-2">
          Signin
        </button>
        <button onClick={Login} className="m-2">
          Login
        </button>
        <button onClick={() => useSignInWithGoogle()} className="m-2">
          SignInWithGoogle
        </button>
        <button onClick={() => useLogout()} className="m-2">
          Logout
        </button>
        <br />
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => {
            const target = e.target.files;
            if (target) {
              console.log(target[0]);
              setImg(target[0]);
            }
          }}
        />
        <button onClick={upload}>Upload</button>
      </div>

      <div className="bg-slate-300 p-3 mt-5">
        <h4>Update User Profile</h4>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          className="ml-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          className="ml-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => {
            const target = e.target.files;
            if (target) {
              console.log(target[0]);
              setImg(target[0]);
            }
          }}
        />
        <button onClick={update}>Update</button>
        <br />
      </div>

      {/*  */}
      <h1 className="mt-10">All Datas</h1>
      <div>
        {!datas ? (
          <p className="text-xl font-medium">Loading...</p>
        ) : (
          <>
            <div>
              {datas?.map((data) => (
                <div key={data.id}>
                  {data.artist} - {data.title}
                </div>
              ))}
            </div>

            <h1 className="mt-10">New Datas</h1>
            <div>
              {newDatas?.map((data) => (
                <div key={data.id}>
                  {data.artist} - {data.title}
                </div>
              ))}
            </div>

            <h1 className="mt-10">Queing Datas</h1>
            <div>
              {queDatas?.map((data) => (
                <div key={data.id}>
                  {data.artist} - {data.title}
                </div>
              ))}
            </div>

            <h1 className="mt-10">User Datas</h1>
            <div>
              {userDatas?.map((data) => (
                <div key={data.id}>
                  {data.artist} - {data.title}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestingAPI;
