import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAK7KFAEfE2_KH0QxE0rFKo6PuwlGJsk2I",

  authDomain: "viewapartments-3b4fc.firebaseapp.com",

  projectId: "viewapartments-3b4fc",

  storageBucket: "viewapartments-3b4fc.appspot.com",

  messagingSenderId: "475584036397",

  appId: "1:475584036397:web:6bbd15dbf914362a9802a4",

  measurementId: "G-6EHHEB42HH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
