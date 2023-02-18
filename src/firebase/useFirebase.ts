import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: "mxrequest-app.firebaseapp.com",
//   projectId: "mxrequest-app",
//   storageBucket: "mxrequest-app.appspot.com",
//   messagingSenderId: "974485100831",
//   appId: process.env.API_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCTDqgeo0BzLvV-I8LlGuRX5z8_UAusFCk",
  authDomain: "mxrequest-app.firebaseapp.com",
  projectId: "mxrequest-app",
  storageBucket: "mxrequest-app.appspot.com",
  messagingSenderId: "974485100831",
  appId: "1:974485100831:web:f5df2e7c071cbe1fccb82a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

export type MusicType = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  status: string;
  time: string;
  user_id: string;
};

// get realtime collection data
export const useGetRequest = async (
  collectionName: string,
  setDatas: React.Dispatch<React.SetStateAction<MusicType[] | undefined>>
) => {
  // const colRef = collection(db, collectionName);
  const colRef = collection(db, "clubs", "document", collectionName);

  const q = query(colRef, orderBy("time", "desc"));
  console.log("getting realtime collection of data");

  try {
    onSnapshot(q, (snap) => {
      const clubs = snap.docs.map((doc) => {
        return { ...(doc.data() as MusicType), id: doc.id };
      });

      setDatas(clubs);
    });
  } catch (error) {
    console.log(error);
  }
};

// clear all collection data
export const useClearClubSession = async (collectionName: string) => {
  // const colRef = collection(db, collectionName);
  const colRef = collection(db, "clubs", "document", collectionName);

  try {
    const snapshot = await getDocs(colRef);

    snapshot.docs.map(async (res) => {
      const docRef = doc(db, collectionName, res.id);

      await deleteDoc(docRef);
    });
  } catch (error) {
    console.log(error);
  }
};

// Request for a new music
export const useRequestMusic = async (
  collectionName: string,
  value: {
    title: string;
    artist: string;
    cover: string;
  }
) => {
  // get the generated id for the user
  const user_id = JSON.parse(localStorage.getItem("mxrequest_id") || "");

  // const colRef = collection(db, collectionName);
  const colRef = collection(db, "clubs", "document", collectionName);

  try {
    await addDoc(colRef, {
      ...value,
      time: Date.now(),
      status: "new",
      user_id,
    });
  } catch (error) {
    console.log(error);
  }
};

// Update the state of a new music
export const useUpdateMusicState = async (
  collectionName: string,
  id: string,
  // status: "new" | "que" | "unavailable" | "played"
  status: string
) => {
  const docRef = doc(db, "clubs", "document", collectionName, id);

  try {
    await updateDoc(docRef, {
      status,
    });
  } catch (error) {
    console.log(error);
  }
};

// SIGNING USER IN
export const useSignIn = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

// LOGIN USER IN
export const useLogin = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// LOGIN USER OUT
export const useLogout = async () => {
  await signOut(auth);
};

// SUBSCRIBING TO AUTH STATE CHANGE
export const useAuthChange = (
  setDatas: React.Dispatch<React.SetStateAction<MusicType[] | undefined>>
) => {
  onAuthStateChanged(auth, (user: any) => {
    setDatas(user);
  });
};

//
//
//
// get realtime collection data by status
// export const useGetRequestByStatus = async (
//   collectionName: string,
//   status: "new" | "que" | "unavailable" | "played",
//   setDatas: React.Dispatch<React.SetStateAction<MusicType[] | undefined>>
// ) => {
//   const colRef = collection(db, collectionName);
//   const q = query(
//     colRef,
//     where("status", "==", status),
//     orderBy("time", "desc")
//   );

//   console.log("getting realtime collection of data by status");

//   try {
//     onSnapshot(q, (snap) => {
//       const clubs = snap.docs.map((doc) => {
//         return { ...(doc.data() as MusicType), id: doc.id };
//       });

//       setDatas(clubs);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // get realtime collection data by user
// export const useGetRequestByUser = async (
//   collectionName: string,
//   setDatas: React.Dispatch<React.SetStateAction<MusicType[] | undefined>>
// ) => {
//   // get the generated id for the user
//   const user_id = JSON.parse(localStorage.getItem("mxrequest_id") || "");

//   const colRef = collection(db, collectionName);
//   const q = query(
//     colRef,
//     where("user_id", "==", user_id),
//     orderBy("time", "desc")
//   );

//   console.log("getting realtime collection of data by user");

//   try {
//     onSnapshot(q, (snap) => {
//       const clubs = snap.docs.map((doc) => {
//         return { ...(doc.data() as MusicType), id: doc.id };
//       });

//       setDatas(clubs);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
