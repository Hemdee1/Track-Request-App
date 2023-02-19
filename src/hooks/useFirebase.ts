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
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { async } from "@firebase/util";
import { uploadImage } from "./useUpload";

// const firebaseConfig = {
//   apiKey: process.env.API_KEY || "mock_key",
//   authDomain: "mxrequest-app.firebaseapp.com",
//   projectId: "mxrequest-app",
//   storageBucket: "mxrequest-app.appspot.com",
//   messagingSenderId: "974485100831",
//   appId: process.env.API_ID || "mock_key",
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

export type UserType = {
  id: string;
  email: string;
  username: string;
  photoURL: string;
  photoQR: string;
  facebook: string;
  twitter: string;
  instagram: string;
};

// get realtime collection data
export const useGetRequest = async (
  collectionName: string,
  setDatas: React.Dispatch<React.SetStateAction<MusicType[] | undefined>>
) => {
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
export const useSignIn = async (
  email: string,
  password: string,
  username: string
) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);

  // create user profile
  const colRef = collection(db, "profile", "document", user.user.email!);
  const value = {
    email,
    username,
    photoURL: "",
    photoQR: "",
    facebook: "",
    twitter: "",
    instagram: "",
  };

  try {
    await addDoc(colRef, value);
  } catch (error) {
    console.log(error);
  }
};

// SIGNING USER IN WITH GOOGLE
export const useSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);

  const colRef = collection(db, "profile", "document", user.user.email!);

  const value = {
    email: user.user.email,
    username: user.user.displayName,
    photoURL: user.user.photoURL,
    photoQR: "",
    facebook: "",
    twitter: "",
    instagram: "",
  };

  try {
    // check if the user already exists
    const snapshot = await getDocs(colRef);
    const doc = snapshot.docs;

    if (doc.length > 0) return;

    // create user profile
    await addDoc(colRef, value);
  } catch (error) {
    console.log(error);
  }
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
export const useAuthChange = async (
  setDatas: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  onAuthStateChanged(auth, async (user) => {
    // get user profile data
    try {
      if (user) {
        const colRef = collection(db, "profile", "document", user.email!);
        const snapshot = await getDocs(colRef);
        const doc = snapshot.docs[0];

        setDatas({ ...(doc.data() as UserType), id: doc.id });
      } else {
        setDatas(null);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export type UserTypeWithImage = {
  id?: string;
  email?: string;
  username?: string;
  photoQR?: string | File;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  photoURL?: string | File;
};

// UPDATE THE USER PROFILE
export const useUpdateProfile = async (
  email: string,
  value: UserTypeWithImage
) => {
  try {
    // if there is a new photo, upload and return the url
    if (value.photoURL && value.photoURL instanceof File) {
      const url = await uploadImage(value.photoURL);

      value.photoURL = url;
    }

    if (value.photoQR && value.photoQR instanceof File) {
      const url = await uploadImage(value.photoQR);

      value.photoQR = url;
    }

    const docRef = doc(db, "profile", "document", email, value.id!);
    await updateDoc(docRef, {
      ...value,
    });
  } catch (error) {
    console.log(error);
  }
};

// CUSTOM ERRORS
export const useCustomError = (message: string) => {
  if (
    message === "Firebase: Error (auth/invalid-email)." ||
    message === "FirebaseError: Firebase: Error (auth/invalid-email)."
  ) {
    return "Invalid email";
  }
  if (
    message === "Firebase: Error (auth/user-not-found)." ||
    message === "FirebaseError: Firebase: Error (auth/user-not-found)."
  ) {
    return "User not found";
  }
  if (
    message === "FirebaseError: Firebase: Error (auth/wrong-password)." ||
    message === "Firebase: Error (auth/wrong-password)."
  ) {
    return "Wrong Password";
  }
  if (
    message === "FirebaseError: Firebase: Error (auth/user-not-found)." ||
    message === "Firebase: Error (auth/user-not-found)."
  ) {
    return "User not found";
  }
  if (
    message ===
      "FirebaseError: FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)." ||
    message ===
      "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    return "Password should be at least 6 characters";
  }
  if (
    message ===
      "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)." ||
    message ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
  ) {
    return "Password should be at least 6 characters";
  }
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
//         return { ...((doc.data()as UserType ) as MusicType), id: doc.id };
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
//         return { ...((doc.data()as UserType ) as MusicType), id: doc.id };
//       });

//       setDatas(clubs);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
