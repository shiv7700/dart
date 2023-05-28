import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

const firebaseConfig = {
  // blaze data
  // apiKey: "AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk",
  // authDomain: "crwn-clothing-db-98d4d.firebaseapp.com",
  // projectId: "crwn-clothing-db-98d4d",
  // storageBucket: "crwn-clothing-db-98d4d.appspot.com",
  // messagingSenderId: "626766232035",
  // appId: "1:626766232035:web:506621582dab103a4d08d6",

  apiKey: "AIzaSyDEjKq1YRnIPmiBrEKVTD4CA2jwpCNBnds",
  authDomain: "dart-db-e2ea8.firebaseapp.com",
  projectId: "dart-db-e2ea8",
  storageBucket: "dart-db-e2ea8.appspot.com",
  messagingSenderId: "818149217770",
  appId: "1:818149217770:web:6a3d1429922b0e971a0e93",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  // const a = {
  //   categories: [
  //     {
  //       title: "Hats",
  //       items: [
  //         {
  //           id: 1,
  //           name: "Brown Brim",
  //           imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
  //           price: 25,
  //         },
  //         {
  //           id: 2,
  //           name: "Blue Beanie",
  //           imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
  //           price: 18,
  //         },
  //         {
  //           id: 3,
  //           name: "Brown Cowboy",
  //           imageUrl: "https://i.ibb.co/QdJwgmp/brown-cowboy.png",
  //           price: 35,
  //         },
  //         {
  //           id: 4,
  //           name: "Grey Brim",
  //           imageUrl: "https://i.ibb.co/RjBLWxB/grey-brim.png",
  //           price: 25,
  //         },
  //         {
  //           id: 5,
  //           name: "Green Beanie",
  //           imageUrl: "https://i.ibb.co/YTjW3vF/green-beanie.png",
  //           price: 18,
  //         },
  //         {
  //           id: 6,
  //           name: "Palm Tree Cap",
  //           imageUrl: "https://i.ibb.co/rKBDvJX/palm-tree-cap.png",
  //           price: 14,
  //         },
  //         {
  //           id: 7,
  //           name: "Red Beanie",
  //           imageUrl: "https://i.ibb.co/bLB646Z/red-beanie.png",
  //           price: 18,
  //         },
  //         {
  //           id: 8,
  //           name: "Wolf Cap",
  //           imageUrl: "https://i.ibb.co/1f2nWMM/wolf-cap.png",
  //           price: 14,
  //         },
  //         {
  //           id: 9,
  //           name: "Blue Snapback",
  //           imageUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png",
  //           price: 16,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Sneakers",
  //       items: [
  //         {
  //           id: 10,
  //           name: "Adidas NMD",
  //           imageUrl: "https://i.ibb.co/0s3pdnc/adidas-nmd.png",
  //           price: 220,
  //         },
  //         {
  //           id: 11,
  //           name: "Adidas Yeezy",
  //           imageUrl: "https://i.ibb.co/dJbG1cT/yeezy.png",
  //           price: 280,
  //         },
  //         {
  //           id: 12,
  //           name: "Black Converse",
  //           imageUrl: "https://i.ibb.co/bPmVXyP/black-converse.png",
  //           price: 110,
  //         },
  //         {
  //           id: 13,
  //           name: "Nike White AirForce",
  //           imageUrl: "https://i.ibb.co/1RcFPk0/white-nike-high-tops.png",
  //           price: 160,
  //         },
  //         {
  //           id: 14,
  //           name: "Nike Red High Tops",
  //           imageUrl: "https://i.ibb.co/QcvzydB/nikes-red.png",
  //           price: 160,
  //         },
  //         {
  //           id: 15,
  //           name: "Nike Brown High Tops",
  //           imageUrl: "https://i.ibb.co/fMTV342/nike-brown.png",
  //           price: 160,
  //         },
  //         {
  //           id: 16,
  //           name: "Air Jordan Limited",
  //           imageUrl: "https://i.ibb.co/w4k6Ws9/nike-funky.png",
  //           price: 190,
  //         },
  //         {
  //           id: 17,
  //           name: "Timberlands",
  //           imageUrl: "https://i.ibb.co/Mhh6wBg/timberlands.png",
  //           price: 200,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Jackets",
  //       items: [
  //         {
  //           id: 18,
  //           name: "Black Jean Shearling",
  //           imageUrl: "https://i.ibb.co/XzcwL5s/black-shearling.png",
  //           price: 125,
  //         },
  //         {
  //           id: 19,
  //           name: "Blue Jean Jacket",
  //           imageUrl: "https://i.ibb.co/mJS6vz0/blue-jean-jacket.png",
  //           price: 90,
  //         },
  //         {
  //           id: 20,
  //           name: "Grey Jean Jacket",
  //           imageUrl: "https://i.ibb.co/N71k1ML/grey-jean-jacket.png",
  //           price: 90,
  //         },
  //         {
  //           id: 21,
  //           name: "Brown Shearling",
  //           imageUrl: "https://i.ibb.co/s96FpdP/brown-shearling.png",
  //           price: 165,
  //         },
  //         {
  //           id: 22,
  //           name: "Tan Trench",
  //           imageUrl: "https://i.ibb.co/M6hHc3F/brown-trench.png",
  //           price: 185,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Womens",
  //       items: [
  //         {
  //           id: 23,
  //           name: "Blue Tanktop",
  //           imageUrl: "https://i.ibb.co/7CQVJNm/blue-tank.png",
  //           price: 25,
  //         },
  //         {
  //           id: 24,
  //           name: "Floral Blouse",
  //           imageUrl: "https://i.ibb.co/4W2DGKm/floral-blouse.png",
  //           price: 20,
  //         },
  //         {
  //           id: 25,
  //           name: "Floral Dress",
  //           imageUrl: "https://i.ibb.co/KV18Ysr/floral-skirt.png",
  //           price: 80,
  //         },
  //         {
  //           id: 26,
  //           name: "Red Dots Dress",
  //           imageUrl: "https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png",
  //           price: 80,
  //         },
  //         {
  //           id: 27,
  //           name: "Striped Sweater",
  //           imageUrl: "https://i.ibb.co/KmSkMbH/striped-sweater.png",
  //           price: 45,
  //         },
  //         {
  //           id: 28,
  //           name: "Yellow Track Suit",
  //           imageUrl: "https://i.ibb.co/v1cvwNf/yellow-track-suit.png",
  //           price: 135,
  //         },
  //         {
  //           id: 29,
  //           name: "White Blouse",
  //           imageUrl: "https://i.ibb.co/qBcrsJg/white-vest.png",
  //           price: 20,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Mens",
  //       items: [
  //         {
  //           id: 30,
  //           name: "Camo Down Vest",
  //           imageUrl: "https://i.ibb.co/xJS0T3Y/camo-vest.png",
  //           price: 325,
  //         },
  //         {
  //           id: 31,
  //           name: "Floral T-shirt",
  //           imageUrl: "https://i.ibb.co/qMQ75QZ/floral-shirt.png",
  //           price: 20,
  //         },
  //         {
  //           id: 32,
  //           name: "Black & White Longsleeve",
  //           imageUrl: "https://i.ibb.co/55z32tw/long-sleeve.png",
  //           price: 25,
  //         },
  //         {
  //           id: 33,
  //           name: "Pink T-shirt",
  //           imageUrl: "https://i.ibb.co/RvwnBL8/pink-shirt.png",
  //           price: 25,
  //         },
  //         {
  //           id: 34,
  //           name: "Jean Long Sleeve",
  //           imageUrl: "https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png",
  //           price: 40,
  //         },
  //         {
  //           id: 35,
  //           name: "Burgundy T-shirt",
  //           imageUrl: "https://i.ibb.co/mh3VM1f/polka-dot-shirt.png",
  //           price: 25,
  //         },
  //       ],
  //     },
  //   ],
  // };

  const userDocRef = doc(db, "users", userAuth.uid);
  // const usercat = doc(db, "categories");

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    // alert("logged in ss");
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
      // await setDoc(usercat, a);
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  // alert("logged in ss");
  // await setDoc(usercat, a);
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
