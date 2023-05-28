import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,

  apiKey: "AIzaSyD6DHC8Bz34Rwn6LXlww9Nk3Fw7LGPsfPI",
  authDomain: "testing-project-5b62e.firebaseapp.com",
  projectId: "testing-project-5b62e",
  storageBucket: "testing-project-5b62e.appspot.com",
  messagingSenderId: "520356410398",
  appId: "1:520356410398:web:be34a6db7a5d7e0435ea0f",
  measurementId: "G-4ZLPR370JJ",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
